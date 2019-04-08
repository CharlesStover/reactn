import { ReactNComponent, ReactNPureComponent } from './components';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import { AdditionalDispatchers, Dispatchers } from './typings/reducer';

const getGlobalStateManager = <GS extends {} = {}, R extends {} = {}>(
): GlobalStateManager<GS, R> =>
  (Context._currentValue2 as GlobalStateManager<GS, R>) ||
  (defaultGlobalStateManager as GlobalStateManager<GS, R>);

// Accurately define React components as having an updater member variable.
interface TrueComponent extends ReactNComponent {
  updater: {
    enqueueForceUpdate: (
      component: ReactNComponent,
      _: null,
      action: 'forceUpdate',
    ) => void;
  };
}



// static getDerivedStateFromProps
/*
export function createReactNGetDerivedStateFromProps<P>(
  Component: ReactNComponent<P> | ReactNPureComponent<P>
) {
  return function ReactNGetDerivedStateFromProps(props: P, ...args) {
    const globalState = getGlobalStateManager();
    const newGlobalState = Component.getDerivedGlobalFromProps(props, globalState.state, ...args);
    globalState.setAny(newGlobalState);

    // getDerivedStateFromProps
    if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
      return Component.getDerivedStateFromProps(props, ...args);
    }
    return null;
  };
}
*/



// this.componentWillUnmount
export function ReactNComponentWillUnmount<GS extends {} = {}>(
  that: ReactNComponent<any, any, GS> | ReactNPureComponent<any, any, GS>,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager<GS>().removePropertyListener(that._globalCallback);
}



// this.componentWillUnmount
export function ReactNComponentWillUpdate<GS extends {} = {}>(
  that: ReactNComponent<any, any, GS> | ReactNPureComponent<any, any, GS>,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager<GS>().removePropertyListener(that._globalCallback);
}



// this.dispatch
export function ReactNDispatch<
  GS extends {} = {},
  R extends {} = {},
>(): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
  return getGlobalStateManager<GS, R>().dispatchers;
}



// this._globalCallback
export function ReactNGlobalCallback(
  that: ReactNComponent | ReactNPureComponent,
): void {
  (that as TrueComponent).updater.enqueueForceUpdate(
    that as TrueComponent,
    null,
    'forceUpdate',
  );
}



// this.global
// Provider.withGlobal passes its own global state instance.
export function ReactNGlobal<GS>(
  that: ReactNComponent<any, any, GS>,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): Readonly<GS> {
  return globalStateManager.spyState(that._globalCallback);
}



// this.setGlobal
export function ReactNSetGlobal<GS>(
  newGlobalState: NewGlobalState<GS>,
  callback: Callback<GS> | null,
  _sync: boolean,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): Promise<GS> {
  if (!callback) {
    return globalStateManager.set(newGlobalState);
  }
  let globalState: GS;
  return globalStateManager.set(newGlobalState)
    .then((gs: GS): GS => {
      globalState = gs;
      return gs;
    })
    .then(callback)
    .then((): GS => globalState);
}
