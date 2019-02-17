import objectGetListener from './object-get-listener';

const MAX_SAFE_INTEGER = 9007199254740990;

export default class GlobalState {

  constructor() {
    this.reset();
  }

  addCallback(callback) {
    this._callbacks.add(callback);
    return () => {
      this.removeCallback(callback);
    };
  }

  // Map component instance to a state property.
  addPropertyListener(property, propertyListener) {
    if (this._propertyListeners.has(property)) {
      this._propertyListeners.get(property).add(propertyListener);
    }
    else {
      this._propertyListeners.set(property, new Set([ propertyListener ]));
    }
  }

  addReducer(name, reducer) {
    if (this.hasReducer(name)) {
      if (this.getReducer(name) === reducer) {
        return;
      }
      throw new Error(`A reducer named ${name} already exists.`);
    }
    this._reducers.set(name, reducer);
    return () => {
      this.removeReducer(name);
    };
  }

  // Begin a transaction.
  beginTransaction() {
    this._transactionId = (this._transactionId + 1) % MAX_SAFE_INTEGER;
    this._transactions.set(this._transactionId, {
      delete: new Set(),
      propertyListeners: new Set(),
      state: new Map()
    });
    return this._transactionId;
  }

  // Commit a transaction.
  commit(transactionId) {
    const transaction = this._transactions.get(transactionId);

    // Delete state properties.
    for (const property of transaction.delete) {
      delete this._state[property];
    }

    // Commit all state changes.
    for (const [ property, value ] of transaction.state.entries()) {
      this._state[property] = value;
    }

    // Force update all components that were a part of this transaction.
    for (const propertyListener of transaction.propertyListeners) {
      propertyListener();
    }

    // Clean up this transaction.
    this._transactions.delete(transactionId);

    // Call each global callback.
    for (const callback of this._callbacks) {

      // Delay these under after the current transaction has deleted?
      this.setAny(callback(this.stateWithReducers));
    }
  }

  getReducer(reducer) {
    return this._reducers.get(reducer);
  }

  getReducers() {
    const reducers = Object.create(null);
    for (const [ name, reducer ] of this._reducers.entries()) {
      reducers[name] = reducer;
    }
    return reducers;
  }

  // Share whether the global state has a property listener.
  // Used in unit testing to prove whether component unmounting has occurred
  //   successfully.
  hasPropertyListener(propertyListener) {
    return this._propertyListeners.has(propertyListener);
  }

  hasReducer(reducer) {
    return this._reducers.has(reducer);
  }

  removeCallback(callback) {
    this._callbacks.delete(callback);
  }

  // Unmap a component instance from all state properties.
  removePropertyListener(propertyListener) {

    // Remove this property listener from the global state.
    for (const propertyListeners of this._propertyListeners.values()) {
      propertyListeners.delete(propertyListener);
    }

    // Remove this property listener from currently-executing transactions.
    for (const transaction of this._transactions.values()) {
      transaction.propertyListeners.delete(propertyListener);
    }
  }

  removeReducer(reducer) {
    this._reducers.remove(reducer);
  }

  // Reset the global state.
  reset() {
    this._callbacks = new Set();
    this._propertyListeners = new Map();
    this._reducers = new Map();
    this._state = Object.create(null);
    this._transactionId = 0;
    this._transactions = new Map();
  }

  // Set a property-value pair as a part of a transaction.
  set(property, value, transactionId) {

    // Silently ignore state properties that share names with reducers.
    // This can occur if you spread global state with reducers.
    // newGlobal = { ...globalWithReducers, newProperty: 'new value' }
    if (this.hasReducer(property)) {
      return transactionId;
    }

    const transaction = this._transactions.get(transactionId);
    if (typeof value === 'undefined') {
      transaction.delete.add(property);
    }
    else {
      transaction.state.set(property, value);
    }

    const propertyListeners = this._propertyListeners.get(property);
    if (propertyListeners) {
      for (const propertyListener of propertyListeners) {
        transaction.propertyListeners.add(propertyListener);
      }
    }

    return transactionId;
  }

  // Set any type of state change.
  setAny(any) {

    // No changes, e.g. getDerivedGlobalFromProps.
    if (
      any === null ||
      typeof any === 'undefined'
    ) {
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

  // Set the state's property-value pairs via an object.
  setObject(obj) {
    const tran = this.beginTransaction();
    for (const [ property, value ] of Object.entries(obj)) {
      this.set(property, value, tran);
    }
    this.commit(tran);
  }

  // Set the state's property-value pairs via a promise.
  setPromise(promise) {
    return promise
      .then(result => {
        return this.setAny(result);
      });
  }

  spyState(propertyListener) {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      property => {
        this.addPropertyListener(property, propertyListener);
      }
    );
  }

  spyStateWithReducers(propertyListener) {
    return Object.assign(
      this.spyState(propertyListener),
      this.getReducers()
    );
  }

  get state() {
    return Object.assign(
      Object.create(null),
      this._state
    );
  }

  get stateWithReducers() {
    return Object.assign(
      this.state,
      this.getReducers()
    );
  }
};
