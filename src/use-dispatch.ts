import { useContext } from 'react';
import useForceUpdate from 'use-force-update';
import { Reducers, State } from '../default';
import Dispatcher, {
  ExtractArguments,
  PropertyDispatcher,
} from '../types/dispatcher';
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
  P extends keyof G = keyof G,
  K extends keyof R = keyof R,
  A extends any[] = any[],
> =
  | Dispatcher<G, A>
  | Dispatcher<G, ExtractArguments<R[K]>>
  | Dispatchers<G, R>
  | PropertyDispatcher<G, P, A>;

type VoidFunction = () => void;



// useDispatch()
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
  P extends keyof G = keyof G,
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer: PropertyReducer<G, P, A>,
  property: P,
): PropertyDispatcher<G, P, A>;

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
  P extends keyof G = keyof G,
  K extends keyof R = keyof R,
  A extends any[] = any[],
>(
  overrideGlobalStateManager: GlobalStateManager<G, R> | null,
  reducer?: K | Reducer<G, R, A> | PropertyReducer<G, P, A>,
  property?: P,
): UseDispatch<G, R, P, K, A> {

  // Require hooks.
  if (!useContext) {
    throw REACT_HOOKS_ERROR;
  }

  const forceUpdate: VoidFunction = useForceUpdate();

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

      // Create a middleware reducer specifically for handling this property.
      const newReducer: Reducer<G, R, A, Partial<G>> = (
        global: G,
        _dispatch: Dispatchers<G, R>,
        ...args: A
      ): Partial<G> => {
        const newGlobalState: Partial<G> = Object.create(null);
        newGlobalState[property] = reducer(global[property], ...args);
        return newGlobalState;
      };

      // Pre-emptively set dispatcher to type PropertyDispatcher so that we can
      //   add the tuple to it.
      const propertyDispatcher: PropertyDispatcher<G, P, A> =
        (
          globalStateManager.createDispatcher(newReducer, reducer.name)
        ) as PropertyDispatcher<G, P, A>;

      // [0] is the property value, with subscription.
      Object.defineProperty(propertyDispatcher, 0, {
        configurable: true,
        enumerable: true,
        get(): G[P] {
          globalStateManager.addPropertyListener(property, forceUpdate);
          return globalStateManager.state[property];
        },
      });

      // [1] is the dispatcher itself.
      propertyDispatcher[1] = propertyDispatcher;

      // Iterators must have a slice method.
      const propertyDispatcherSlice = (
        start?: number,
        end?: number
      ): (G[P] | Dispatcher<G, A>)[] => {
        const values: (G[P] | Dispatcher<G, A>)[] =
          [ propertyDispatcher[0], propertyDispatcher[1] ];
        return values.slice.apply(values, [ start, end ]);
      };
      propertyDispatcher.slice = propertyDispatcherSlice;

      // Iterators must have a Symbol.iterator property.
      const propertyDispatcherIterator =
        (): IterableIterator<G[P] | Dispatcher<G, A>> => {
          let index: number = 0;
          const propertyDispatcherIteratorNext =
            (): IteratorResult<Dispatcher<G, A> | G[P]> => {

              // IteratorResult
              if (index < 2) {
                return {
                  done: false,
                  value: propertyDispatcher[index++],
                };
              }

              // Done.
              index = 0;
              return {
                done: true,
                value: undefined,
              };
            };

          // IterableIterator
          return {
            [Symbol.iterator]: propertyDispatcher[Symbol.iterator],
            next: propertyDispatcherIteratorNext,
          };
        };
      propertyDispatcher[Symbol.iterator] = propertyDispatcherIterator;

      return propertyDispatcher;
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
