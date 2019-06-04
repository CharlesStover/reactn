import { useContext } from 'react';
import { Reducers, State } from '../default';
import Dispatcher, { ExtractArguments } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import Reducer, { PropertyReducer } from '../types/reducer';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';
import isPropertyReducer from './utils/is-property-reducer';
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

// useDispatch(Function, 'property')
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
  P extends keyof G = keyof G,
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer: PropertyReducer<G, A, P>,
  property: P,
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

// useDispatch('name', 'property')
/*
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  K extends keyof R = keyof R,
  P extends keyof G = keyof G,
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer: K,
  property: P,
): Dispatcher<G, ExtractArguments<R[K]>>;
*/

// Implementation
export default function _useDispatch<
  G extends {} = State,
  R extends {} = Reducers,
  K extends keyof R = keyof R,
  A extends any[] = any[],
  P extends keyof G = keyof G,
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer?: K | Reducer<G, R, A> | PropertyReducer<G, A, P>,
  property?: P,
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

    // If this reducer mutates a specific property, create a dispatcher that
    //   targets that property.
    if (isPropertyReducer(reducer, property)) {
      const newReducer: Reducer<G, R, A, Partial<G>> = (
        global: G,
        _dispatch: Dispatchers<G, R>,
        ...args: A
      ): Partial<G> => {
        const newGlobalState: Partial<G> = Object.create(null);
        newGlobalState[property] = reducer(global[property], ...args);
        return newGlobalState;
      };
      return globalStateManager.createDispatcher(newReducer);
    }

    // If this reducer does not mutate a specific property, create it as is.
    return globalStateManager.createDispatcher(reducer);
  }

  // Use a pre-defined reducer.

  // If this reducer mutates a specific property, create a dispatcher that
  //   targets that property.
  // Cannot currently be done, because getDispatcher returns a function to
  //   mutate the global state. There is no getReducer method for returning the
  //   state change.
  /*
  if (property) {
    const newReducer: Reducer<G, R, ExtractArguments<R[K]>, Partial<G>> = (
      global: G,
      dispatch: Dispatchers<G, R>,
      ...args: ExtractArguments<R[K]>
    ): Partial<G> => {
      const newGlobalState: Partial<G> = Object.create(null);
      newGlobalState[property] = reducer(global, dispatch, ...args);
      return newGlobalState;
    };
    return globalStateManager.createDispatcher(newReducer);
  }
  */

  return globalStateManager.getDispatcher(reducer);
};
