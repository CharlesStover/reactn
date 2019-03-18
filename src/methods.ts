import { Component } from 'react';
import { ReactNComponent, ReactNPureComponent } from './components';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';

const getGlobalStateManager = <GS = Object>(): GlobalStateManager<GS> => (
  Context._currentValue2 ||
  defaultGlobalStateManager
) as GlobalStateManager<GS>;



// static getDerivedStateFromProps
/*
export function createReactNGetDerivedStateFromProps<P>(
  Component: ReactNComponent<P> | ReactNPureComponent<P>
) {
  return function ReactNGetDerivedStateFromProps(props: P, ...args) {
    const globalState = getGlobalStateManager();
    const newGlobal = Component.getDerivedGlobalFromProps(props, globalState.state, ...args);
    globalState.setAny(newGlobal);

    // getDerivedStateFromProps
    if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
      return Component.getDerivedStateFromProps(props, ...args);
    }
    return null;
  };
}
*/



// this.componentWillUnmount
export function ReactNComponentWillUnmount(
  _this: ReactNComponent | ReactNPureComponent
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager().removePropertyListener(_this._globalCallback);
}



// this._globalCallback
export function ReactNGlobalCallback(
  _this: ReactNComponent | ReactNPureComponent
): void {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
}



// this.global
// Provider.withGlobal passes its own global state instance.
export function ReactNGlobal<GS>(
  _this: ReactNComponent<{}, {}, GS> | ReactNPureComponent<{}, {}, GS>,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): Readonly<GS> {
  return globalStateManager.spyState(_this._globalCallback);
}



// this.setGlobal
export function ReactNSetGlobal<GS>(
  _this: ReactNComponent<{}, {}, GS> | ReactNPureComponent<{}, {}, GS>,
  newGlobal: NewGlobalState<GS>,
  callback: Callback<GS> | null,
  _sync: boolean,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): ReactNPromise<GS> {
  if (callback) {
    return globalStateManager.set(newGlobal)
      .then(callback);
  }
  return globalStateManager.set(newGlobal);
}
