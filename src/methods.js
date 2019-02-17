import Context from './context';
import defaultGlobalState from './default-global-state';

const getGlobalState = () =>
  Context._currentValue2 || defaultGlobalState;

// static getDerivedStateFromProps
export function createReactNGetDerivedStateFromProps(Component) {
  return function ReactNGetDerivedStateFromProps(props, ...args) {
    const globalState = getGlobalState();
    const newGlobal = Component.getDerivedGlobalFromProps(props, globalState.stateWithReducers, ...args);
    globalState.setAny(newGlobal);

    // getDerivedStateFromProps
    if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
      return Component.getDerivedStateFromProps(props, ...args);
    }
    return null;
  };
}



// this.componentWillUnmount
export function ReactNComponentWillUnmount(_this) {

  // No longer re-render this component on global state change.
  getGlobalState().removePropertyListener(_this._globalCallback);
}



// this._globalCallback
export function ReactNGlobalCallback(_this) {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
}



// this.global
// Provider.withGlobal passes its own global state instance.
export function ReactNGlobal(_this, globalState = getGlobalState()) {
  return globalState.spyStateWithReducers(_this._globalCallback);
}



// this.setGlobal
export function ReactNSetGlobal(_this, newGlobal, callback, sync, globalState = getGlobalState()) {

  // Update the state synchronously.
  if (sync) {
    globalState.setAnyCallback(newGlobal, callback);
  }

  // Update the state asynchronously.
  else {
    setTimeout(() => {
      ReactNSetGlobal(_this, newGlobal, callback, true, globalState);
    }, 0);
  }
}
