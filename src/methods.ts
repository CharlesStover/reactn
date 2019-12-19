import { Reducers, State } from '../default';
import Callback from '../types/callback';
import Dispatchers from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import { ReactNComponent, ReactNPureComponent } from './components';
import GlobalStateManager from './global-state-manager';
import setGlobal from './set-global';
import getGlobalStateManager from './utils/get-global-state-manager';



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



// this.shouldComponentUpdate
export function ReactNShouldComponentUpdate<G extends {} = State>(
  that: ReactNComponent<any, any, G> | ReactNPureComponent<any, any, G>,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager<G>().removePropertyListener(that._globalCallback);
}



// this.dispatch
export function ReactNDispatch<
  G extends {} = State,
  R extends {} = Reducers,
>(): Dispatchers<G, R> {
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
export function ReactNSetGlobal<G extends {} = State, R extends {} = Reducers>(
  newGlobalState: NewGlobalState<G>,
  callback: Callback<G, R> | null,
  _sync: boolean,
  globalStateManager: GlobalStateManager<G, R> = getGlobalStateManager<G, R>(),
): Promise<G> {
  return setGlobal(globalStateManager, newGlobalState, callback);
}
