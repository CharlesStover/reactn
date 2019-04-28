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



interface DevToolAction<G> extends Action<'STATE_CHANGE'> {
  stateChange: Partial<G>;
}

export type ReduxEnhancedStore<G> =
  Store<G & any, DevToolAction<G>>;

export interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: typeof devToolsEnhancer;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (options: EnhancerOptions) =>
    typeof compose;
}



const reducer = <G extends {} = State>(
  state: G,
  action: DevToolAction<G>,
) => ({
  ...state,
  ...action.stateChange,
});

const REDUX_DEVTOOLS_OPTIONS: EnhancerOptions = {
  name: 'ReactN state',
};

declare const window: Window | void;



export function createReduxEnhancedStore<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
): null | ReduxEnhancedStore<G> {
  try {
    if (
      process.env.NODE_ENV === 'production' ||
      typeof window !== 'object' ||
      !Object.prototype.hasOwnProperty.call(
        window,
        '__REDUX_DEVTOOLS_EXTENSION__',
      )
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
