import { Reducers, State } from '../default';
import { ReactNComponent, ReactNPureComponent } from './components';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import { AdditionalDispatchers, DispatcherMap } from './typings/reducer';

const getGlobalStateManager = <
  G extends {} = State,
  R extends {} = Reducers,
>(): GlobalStateManager<G, R> =>
  (Context._currentValue2 as GlobalStateManager<G, R>) ||
  (defaultGlobalStateManager as GlobalStateManager<G, R>);

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
export function ReactNComponentWillUnmount<G extends {} = State>(
  that: ReactNComponent<any, any, G> | ReactNPureComponent<any, any, G>,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager<G>().removePropertyListener(that._globalCallback);
}



// this.componentWillUnmount
export function ReactNComponentWillUpdate<G extends {} = State>(
  that: ReactNComponent<any, any, G> | ReactNPureComponent<any, any, G>,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager<G>().removePropertyListener(that._globalCallback);
}



// this.dispatch
export function ReactNDispatch<
  G extends {} = State,
  R extends {} = Reducers,
>(): DispatcherMap<G, R> & AdditionalDispatchers<G> {
  return getGlobalStateManager<G, R>().dispatchers;
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
export function ReactNGlobal<G extends {} = State>(
  that: ReactNComponent<any, any, G>,
  globalStateManager: GlobalStateManager<G> = getGlobalStateManager<G>(),
): Readonly<G> {
  return globalStateManager.spyState(that._globalCallback);
}



// this.setGlobal
export function ReactNSetGlobal<G extends {} = State>(
  newGlobalState: NewGlobalState<G>,
  callback: Callback<G> | null,
  _sync: boolean,
  globalStateManager: GlobalStateManager<G> = getGlobalStateManager<G>(),
): Promise<G> {
  if (!callback) {
    return globalStateManager.set(newGlobalState);
  }
  let globalState: G;
  return globalStateManager.set(newGlobalState)
    .then((gs: G): G => {
      globalState = gs;
      return gs;
    })
    .then(callback)
    .then((): G => globalState);
}
