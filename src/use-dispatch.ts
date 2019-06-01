import { useContext } from 'react';
import { Reducers, State } from '../default';
import Dispatcher, { ExtractArguments } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import Reducer from '../types/reducer';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';
import REACT_HOOKS_ERROR from './utils/react-hooks-error';



export type UseDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  K extends keyof R = keyof R,
  A extends any[] = any[]
> = Dispatcher<G, A> | Dispatcher<G, ExtractArguments<R[K]>> | Dispatchers<G, R>;



// useGlobal()
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
): Dispatchers<G, R>;

// useDispatch(Function)
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer: Reducer<G, R, A>,
): Dispatcher<G, A>;

// useDispatch('name')
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  K extends keyof R = keyof R,
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer: K,
): Dispatcher<G, ExtractArguments<R[K]>>;

// Implementation
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  K extends keyof R = keyof R,
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer?: K | Reducer<G, R, A>,
): UseDispatch<G, R, K, A> {

  // Require hooks.
  if (!useContext) {
    throw REACT_HOOKS_ERROR;
  }

  // Get the global state manager.
  const globalStateManager: GlobalStateManager<G, R> =
    overrideGlobalStateManager ||
    (useContext(Context) as GlobalStateManager<G, R>) ||
    (defaultGlobalStateManager as GlobalStateManager<G, R>);

  // Return all dispatchers.
  if (typeof reducer === 'undefined') {
    return globalStateManager.dispatchers;
  }

  // Use a custom reducer.
  if (typeof reducer === 'function') {
    return globalStateManager.createDispatcher(reducer);
  }

  // Use a pre-defined reducer.
  return globalStateManager.getDispatcher(reducer);
};
