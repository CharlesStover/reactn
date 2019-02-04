const defaultGlobalState = require('./default-global-state');



// static getDerivedStateFromProps
function createReactNGetDerivedStateFromProps(Component) {
  return function ReactNGetDerivedStateFromProps(props, ...args) {
    const newGlobal = Component.getDerivedGlobalFromProps(props, defaultGlobalState.stateWithReducers, ...args);
    defaultGlobalState.setAny(newGlobal);

    // getDerivedStateFromProps
    if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
      return Component.getDerivedStateFromProps(props, ...args);
    }
    return null;
  };
}



// this.componentWillUnmount
function ReactNComponentWillUnmount(_this) {

  // No longer re-render this component on global state change.
  defaultGlobalState.removePropertyListener(_this._globalCallback);
}



// this._globalCallback
function ReactNGlobalCallback(_this) {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
}



// this.global
function ReactNGlobal(_this) {
  return defaultGlobalState.spyStateWithReducers(_this._globalCallback);
}



// this.setGlobal
function ReactNSetGlobal(_this, newGlobal, callback, sync) {

  // Update the state synchronously.
  if (sync) {
    defaultGlobalState.setAnyCallback(newGlobal, callback);
  }

  // Update the state asynchronously.
  else {
    setTimeout(() => {
      ReactNSetGlobal(_this, newGlobal, callback, true);
    }, 0);
  }
}



module.exports = {
  createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
};
