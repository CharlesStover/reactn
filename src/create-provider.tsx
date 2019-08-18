import * as React from 'react';
import { Reducers, State } from '../default';
import Callback from '../types/callback';
import DispatchFunction from '../types/dispatch-function';
import Dispatcher, {
  ExtractArguments,
  PropertyDispatcher,
} from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import ReactNProvider from '../types/provider';
import Reducer, { AdditionalReducers, PropertyReducer } from '../types/reducer';
import UseGlobal, { GlobalTuple, StateTuple } from '../types/use-global';
import WithGlobal, { Getter, Setter } from '../types/with-global';
import Context from './context';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import GlobalStateManager from './global-state-manager';
import setGlobal from './set-global';
import useDispatch, { UseDispatch } from './use-dispatch';
import useGlobal from './use-global';
import isPropertyReducer from './utils/is-property-reducer';
import REACT_CONTEXT_ERROR from './utils/react-context-error';
import withGlobal from './with-global';



type BooleanFunction = () => boolean;



export default function _createProvider<
  G extends {} = State,
  R extends {} = Reducers,
>(
  initialState: G = Object.create(null),
  initialReducers: R = Object.create(null),
): ReactNProvider<G, R> {

  // If the Context API is not supported, you cannot create a Provider.
  if (Context === null) {
    throw REACT_CONTEXT_ERROR;
  }

  const globalStateManager = new GlobalStateManager<G, R>(
    initialState,
    initialReducers,
  );

  return class ReactNProvider extends React.Component<{}, {}> {

    public static addCallback(f: Callback<G>): BooleanFunction {
      return globalStateManager.addCallback(f);
    }

    public static addReducer<A extends any[] = any[]>(
      name: string,
      reducer: Reducer<G, R, A>,
    ): BooleanFunction {
      return addReducer<G>(globalStateManager, name, reducer);
    }

    public static addReducers(
      reducers: AdditionalReducers<G, R>,
    ): BooleanFunction {
      return addReducers<G>(globalStateManager, reducers);
    }

    public static get dispatch(): Dispatchers<G, R> {
      return globalStateManager.dispatchers;
    }

    public static get dispatcherMap(): DispatchFunction<G> & Dispatchers<G, R> {
      return globalStateManager.dispatcherMap;
    }

    public static getDispatch(): Dispatchers<G, R> {
      return globalStateManager.dispatchers;
    }

    public static getGlobal(): G {
      return globalStateManager.state;
    }

    public static get global(): G {
      return globalStateManager.state;
    }

    public static removeCallback(callback: Callback<G>): boolean {
      return globalStateManager.removeCallback(callback);
    }

    public static reset(): void {
      return globalStateManager.reset();
    }

    public static setGlobal(
      newGlobalState: NewGlobalState<G>,
      callback: Callback<G> | null = null,
    ): Promise<G> {
      return setGlobal<G>(globalStateManager, newGlobalState, callback);
    }

    public static useDispatch(): Dispatchers<G, R>;
    public static useDispatch<A extends any[] = any[]>(
      reducer: Reducer<G, R, A>,
    ): Dispatcher<G, A>;
    public static useDispatch<P extends keyof G = keyof G, A extends any[] = any[]>(
      reducer: PropertyReducer<G, P, A>,
      property: P,
    ): PropertyDispatcher<G, P, A>;
    public static useDispatch<K extends keyof R = keyof R>(
      reducer: K,
    ): Dispatcher<G, ExtractArguments<R[K]>>;
    public static useDispatch<P extends keyof G = keyof G, K extends keyof R = keyof R, A extends any[] = any[]>(
      reducer?: K | Reducer<G, R, A> | PropertyReducer<G, P, A>,
      property?: P,
    ): UseDispatch<G, R, P, K, A> {

      // TypeScript required these synonymous function calls be separate.
      // Each call has its own generics, pleasing the TypeScript overlord.
      if (typeof reducer === 'function') {
        if (isPropertyReducer(reducer, property)) {
          return useDispatch<G, R, P, A>(
            globalStateManager,
            reducer,
            property,
          );
        }
        return useDispatch<G, R, A>(globalStateManager, reducer);
      }
      return useDispatch<G, R>(globalStateManager, reducer);
    }

    public static useGlobal(): GlobalTuple<G>;
    public static useGlobal<Property extends keyof G>(
      property: Property,
    ): StateTuple<G, Property>;
    public static useGlobal<Property extends keyof G>(
      property?: Property,
    ): UseGlobal<G, Property> {
      return useGlobal(globalStateManager, property);
    }

    public static withGlobal<HP extends {} = {}, LP extends {} = {}>(
      getter: Getter<G, R, HP, LP> = (global: G): G => global,
      setter: Setter<G, R, HP, LP> = (): null => null,
    ): WithGlobal<HP, LP> {
      return withGlobal<G, R, HP, LP>(globalStateManager, getter, setter);
    }

    public render(): JSX.Element {
      return (
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  };
}
