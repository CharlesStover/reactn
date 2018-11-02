const globalStateManager = require('./global-state-manager');



// static getDerivedStateFromProps
function createReactNGetDerivedStateFromProps(Component) {
  return function ReactNGetDerivedStateFromProps(props, ...args) {
    const newGlobal = Component.getDerivedGlobalFromProps(props, globalStateManager.stateWithReducers, ...args);
    globalStateManager.setAny(newGlobal);

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
  globalStateManager.removeKeyListener(_this._globalCallback);
}



// this._globalCallback
function ReactNGlobalCallback(_this) {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
}



// this.global
function ReactNGlobal(_this) {
  return globalStateManager.spyStateWithReducers(_this._globalCallback);
}



// this.setGlobal
function ReactNSetGlobal(_this, global, callback) {
  globalStateManager.setAnyCallback(global, callback);
}



module.exports = {
  createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
};
