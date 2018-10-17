import objectGetListener from './object-get-listener';

class GlobalStateManager {

  _state = Object.create(null);
  listeners = new Map();
  transactionId = 0;
  transactions = new Map();

  // Map component instance to a state property.
  addListener(key, instance) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).add(instance);
    }
    else {
      this.listeners.set(key, new Set([ instance ]));
    }
  };

  // Begin a transaction.
  beginTransaction() {
    this.transactionId++;
    this.transactions.set(this.transactionId, {
      components: new Set(),
      state: new Map()
    });
    return this.transactionId;
  }

  // Commit a transaction.
  commit(transactionId) {
    const transaction = this.transactions.get(transactionId);

    // Commit all state changes.
    for (const [ key, value ] of transaction.state.entries()) {
      this._state[key] = value;
    }

    // Force update all components that were a part of this transaction.
    for (const instance of transaction.components) {
      instance.updater.enqueueForceUpdate(instance, null, 'forceUpdate');
    }

    this.transactions.delete(transactionId);
  }

  // Unmap a component instance from all state properties.
  removeListeners(instance) {
    for (const instances of this.listeners.values()) {
      if (instances.has(instance)) {
        instances.delete(instance);
      }
    }
  }

  // Set a key-value pair as a part of a transaction.
  set(key, value, transactionId) {

    const transaction = this.transactions.get(transactionId);
    transaction.state.set(key, value);

    const instances = this.listeners.get(key);
    if (instances) {
      for (const instance of instances) {
        transaction.components.add(instance);
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
  state(componentInstance) {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      key => {
        this.addListener(key, componentInstance);
      }
    );
  }
};

export default new GlobalStateManager();
