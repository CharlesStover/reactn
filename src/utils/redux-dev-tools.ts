import {
  Action,
  compose,
  Store,
  StoreEnhancer,
} from 'redux';
import {
  devToolsEnhancer,
  EnhancerOptions,
} from 'redux-devtools-extension/developmentOnly';
import { State } from '../../default';
import GlobalStateManager from '../global-state-manager';



export type DevToolAction<G extends {} = State> =
  DevToolReducerAction |
  DevToolStateChangeAction<G>;

interface DevToolReducerAction extends Action<string> {
  args: any[];
}

interface DevToolStateChangeAction<G extends {} = State>
extends Action<''> {
  stateChange: Partial<G>;
}

export type ReduxEnhancedStore<G extends {} = State> =
  Store<G & any, DevToolAction<G>>;

export interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: typeof devToolsEnhancer;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (options: EnhancerOptions) =>
    typeof compose;
}



const hasStateChange = <G extends {} = State>(
  action: DevToolAction<G>,
): action is DevToolStateChangeAction<G> =>
  Object.prototype.hasOwnProperty.call(action, 'stateChange');

const reducer = <G extends {} = State>(
  state: G,
  action: DevToolAction<G>,
) => {
  if (hasStateChange(action)) {
    return {
      ...state,
      ...action.stateChange,
    };
  }
  return state;
};

const REDUX_DEVTOOLS_OPTIONS: EnhancerOptions = {
  name: 'ReactN',
};

declare const window: Window | void;



export function createReduxEnhancedStore<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
): null | ReduxEnhancedStore<G> {
  try {
    if (
      process.env.NODE_ENV === 'production' ||
      typeof window !== 'object' ||
      !window.__REDUX_DEVTOOLS_EXTENSION__
    ) {
      return null;
    }

    // Verify that Redux is installed without console output.
    require.resolve('redux');

    const { createStore } = require('redux');

    // Enhance the store with Redux DevTools.
    const storeEnhancer: StoreEnhancer =
      window.__REDUX_DEVTOOLS_EXTENSION__(REDUX_DEVTOOLS_OPTIONS);

    // Create the store.
    const store: ReduxEnhancedStore<G> = createStore(
      reducer,
      globalStateManager.state,
      storeEnhancer,
    );

    return store;
  }

  // If Redux is not installed, fail silently.
  catch (e) {
    return null;
  }
}
