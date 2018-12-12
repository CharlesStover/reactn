const objectGetListener = require('./object-get-listener');
const reducers = require('./reducers');

const MAX_SAFE_INTEGER = 9007199254740990;

class GlobalStateManager {

  constructor() {
    this.reset();
  }

  // Map component instance to a state property.
  addPropertyListener(property, propertyListener) {
    if (this._propertyListeners.has(property)) {
      this._propertyListeners.get(property).add(propertyListener);
    }
    else {
      this._propertyListeners.set(property, new Set([ propertyListener ]));
    }
  };

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

    this._transactions.delete(transactionId);
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

  // Reset the global state.
  reset() {
    this._propertyListeners = new Map();
    this._state = Object.create(null);
    this._transactionId = 0;
    this._transactions = new Map();
  }

  // Set a property-value pair as a part of a transaction.
  set(property, value, transactionId) {

    // Silently ignore state properties that share names with reducers.
    // This can occur if you spread global state with reducers.
    // newGlobal = { ...globalWithReducers, newProperty: 'new value' }
    if (Object.prototype.hasOwnProperty.call(reducers, property)) {
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
