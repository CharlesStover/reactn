const objectGetListener = require('./object-get-listener');

const MAX_SAFE_INTEGER = 9007199254740990;

class GlobalStateManager {

  _keyListeners = new Map();
  _state = Object.create(null);
  _transactionId = 0;
  _transactions = new Map();

  // Map component instance to a state property.
  addKeyListener(key, keyListener) {
    if (this._keyListeners.has(key)) {
      this._keyListeners.get(key).add(keyListener);
    }
    else {
      this._keyListeners.set(key, new Set([ keyListener ]));
    }
  };

  // Begin a transaction.
  beginTransaction() {
    this._transactionId = (this._transactionId + 1) % MAX_SAFE_INTEGER;
    this._transactions.set(this._transactionId, {
      keyListeners: new Set(),
      state: new Map()
    });
    return this._transactionId;
  }

  // Commit a transaction.
  commit(transactionId) {
    const transaction = this._transactions.get(transactionId);

    // Commit all state changes.
    for (const [ key, value ] of transaction.state.entries()) {
      this._state[key] = value;
    }

    // Force update all components that were a part of this transaction.
    for (const keyListener of transaction.keyListeners) {
      keyListener();
    }

    this._transactions.delete(transactionId);
  }

  // Unmap a component instance from all state properties.
  removeKeyListener(keyListener) {
    for (const keyListeners of this._keyListeners.values()) {
      keyListeners.delete(keyListener);
    }
  }

  // Set a key-value pair as a part of a transaction.
  set(key, value, transactionId) {

    const transaction = this._transactions.get(transactionId);
    transaction.state.set(key, value);

    const keyListeners = this._keyListeners.get(key);
    if (keyListeners) {
      for (const keyListener of keyListeners) {
        transaction.keyListeners.add(keyListener);
      }
    }

    return transactionId;
  }

  // Set any type of state change.
  setAny(any) {

    // No changes, e.g. getDerivedGlobalFromProps.
    if (any === null) {
      return;
    }

    if (any instanceof Promise) {
      return this.setPromise(any);
    }

    if (typeof any === 'function') {
      return this.setFunction(any);
    }

    if (typeof any === 'object') {
      return this.setObject(any);
    }

    throw new Error('Global state must be a function, null, object, or Promise.');
  }

  setFunction(f) {
    return this.setAny(f(this._state));
  }

  // Set the state's key-value pairs via an object.
  setObject(obj) {
    const tran = this.beginTransaction();
    for (const [ key, value ] of Object.entries(obj)) {
      this.set(key, value, tran);
    }
    this.commit(tran);
  }

  // Set the state's key-value pairs via a promise.
  setPromise(promise) {
    return promise
      .then(result => {
        return this.setAny(result);
      });
  }

  // Create a state instance that is unique to the component instance.
  state(keyListener) {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      key => {
        this.addKeyListener(key, keyListener);
      }
    );
  }
};

module.exports = new GlobalStateManager();
