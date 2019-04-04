import { useContext } from 'react';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';
import Reducer, { Dispatcher, ExtractA } from './typings/reducer';
import REACT_HOOKS_ERROR from './utils/react-hooks-error';



export type UseGlobalReducer<
  GS extends {} = {},
  R extends {} = {},
  K extends keyof R = keyof R,
  A extends any[] = any[]
> = Dispatcher<GS, A> | Dispatcher<GS, ExtractA<R[K]>>;



// useGlobalReducer(Function)
export default function useGlobalReducer<
  GS extends {} = {},
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<GS, any> | null,
  reducer: Reducer<GS, A>,
): Dispatcher<GS, A>;

// useGlobalReducer('name')
export default function useGlobalReducer<
  GS extends {} = {},
  R extends {} = {},
  K extends keyof R = keyof R,
>(
  overrideGlobalStateManager: GlobalStateManager<GS, R> | null,
  reducer: K,
): Dispatcher<GS, ExtractA<R[K]>>;

// Implementation
export default function useGlobalReducer<
  GS extends {} = {},
  R extends {} = {},
  K extends keyof R = keyof R,
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<GS, R> | null,
  reducer: K | Reducer<GS, A>,
): UseGlobalReducer<GS, R, K, A> {

  // Require hooks.
  if (!useContext) {
    throw REACT_HOOKS_ERROR;
  }

  // Get the global state manager.
  const globalStateManager: GlobalStateManager<GS, R> =
    overrideGlobalStateManager ||
    (useContext(Context) as GlobalStateManager<GS, R>) ||
    (defaultGlobalStateManager as GlobalStateManager<GS, R>);

  // Use a custom reducer.
  if (typeof reducer === 'function') {
    return globalStateManager.createDispatcher(reducer);
  }

  // Use a pre-defined reducer.
  return globalStateManager.getDispatcher(reducer);
};
