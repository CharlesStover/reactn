const objectGetListener = require('./object-get-listener');
const reducers = require('./reducers');

const MAX_SAFE_INTEGER = 9007199254740990;

class GlobalStateManager {

  constructor() {
    this.reset();
  }

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
      delete: new Set(),
      keyListeners: new Set(),
      state: new Map()
    });
    return this._transactionId;
  }

  // Commit a transaction.
  commit(transactionId) {
    const transaction = this._transactions.get(transactionId);

    // Delete state properties.
    for (const key of transaction.delete) {
      delete this._state[key];
    }

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

  // Reset the global state.
  reset() {
    this._keyListeners = new Map();
    this._state = Object.create(null);
    this._transactionId = 0;
    this._transactions = new Map();
  }

  // Set a key-value pair as a part of a transaction.
  set(key, value, transactionId) {

    // Silently ignore state properties that share names with reducers.
    // This can occur if you spread global state with reducers.
    // newGlobal = { ...globalWithReducers, newKey: 'new value' }
    if (Object.prototype.hasOwnProperty.call(reducers, key)) {
      return transactionId;
    }

    const transaction = this._transactions.get(transactionId);
    if (typeof value === 'undefined') {
      transaction.delete.add(key);
    }
    else {
      transaction.state.set(key, value);
    }

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

  setAnyCallback(any, callback = null) {
    const newGlobal = this.setAny(any);

    // If there is a callback,
    if (typeof callback === 'function') {
      if (newGlobal instanceof Promise) {
        newGlobal.then(() => {
          callback(this.stateWithReducers);
        });
      }
      else {
        callback(this.stateWithReducers);
      }
    }
  }

  setFunction(f) {
    return this.setAny(f(this.stateWithReducers));
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

  spyState(keyListener) {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      key => {
        this.addKeyListener(key, keyListener);
      }
    );
  }

  spyStateWithReducers(keyListener) {
    return Object.assign(
      this.spyState(keyListener),
      reducers
    );
  }

  get state() {
    return Object.assign(Object.create(null), this._state);
  }

  get stateWithReducers() {
    return Object.assign(this.state, reducers);
  }
};

module.exports = new GlobalStateManager();
