import { ReactNComponent, ReactNPureComponent } from './components';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, {
  NewGlobalState,
  PropertyListener,
} from './global-state-manager';
import Callback from './typings/callback';

type RSA = Record<string, any>;

const getGlobalStateManager = <GS extends RSA = RSA>(
): GlobalStateManager<GS> => (
  Context._currentValue2 ||
  defaultGlobalStateManager
) as GlobalStateManager<GS>;

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
  propertyListener: PropertyListener,
): void {

  // No longer re-render this component on global state change.
  getGlobalStateManager().removePropertyListener(propertyListener);
}



// this._globalCallback
export function ReactNGlobalCallback(
  _this: ReactNComponent | ReactNPureComponent,
): void {
  const that: TrueComponent = _this as TrueComponent;
  that.updater.enqueueForceUpdate(that, null, 'forceUpdate');
}



// this.global
// Provider.withGlobal passes its own global state instance.
export function ReactNGlobal<GS>(
  propertyListener: PropertyListener,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): Readonly<GS> {
  return globalStateManager.spyState(propertyListener);
}



// this.setGlobal
export function ReactNSetGlobal<GS>(
  _this: ReactNComponent<{}, {}, GS> | ReactNPureComponent<{}, {}, GS>,
  newGlobal: NewGlobalState<GS>,
  callback: Callback<GS> | null,
  _sync: boolean,
  globalStateManager: GlobalStateManager<GS> = getGlobalStateManager<GS>(),
): Promise<GS> {
  if (!callback) {
    return globalStateManager.set(newGlobal);
  }
  let globalState: GS;
  return globalStateManager.set(newGlobal)
    .then(gs => {
      globalState = gs;
      return gs;
    })
    .then(callback)
    .then(() => globalState);
}
