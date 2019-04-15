import { Reducers, State } from '../default';
import * as React from 'react';
import Context from './context';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import setGlobal from './set-global';
import Callback from './typings/callback';
import Reducer, {
  AdditionalDispatchers,
  Dispatcher,
  DispatcherMap,
  ExtractA,
  ReducerMap,
} from './typings/reducer';
import useGlobal, { GlobalTuple, StateTuple, UseGlobal } from './use-global';
import useGlobalReducer, { UseGlobalReducer } from './use-global-reducer';
import withGlobal, { Getter, Setter, WithGlobal } from './with-global';



type BooleanFunction = () => boolean;

export interface ReactNProvider<
  G extends {} = State,
  R extends {} = Reducers,
> {
  addCallback(callback: Callback<G>): BooleanFunction;
  addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<G, A>,
  ): BooleanFunction;
  addReducers(reducers: ReducerMap<G>): BooleanFunction;
  dispatch: DispatcherMap<G, R> & AdditionalDispatchers<G>;
  getDispatch(): DispatcherMap<G, R> & AdditionalDispatchers<G>;
  getGlobal(): G;
  global: G;
  removeCallback(callback: Callback<G>): boolean;
  reset(): void;
  setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<G>;
  useGlobal(): GlobalTuple<G>;
  useGlobal<Property extends keyof G>(
    property: Property,
  ): StateTuple<G, Property>;
  useGlobalReducer<A extends any[] = any[]>(
    reducer: Reducer<G, A>,
  ): Dispatcher<G, A>;
  useGlobalReducer<K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<G, ExtractA<R[K]>>;
  withGlobal<HP, LP>(
    getter: Getter<G, HP, LP>,
    setter: Setter<G, HP, LP>,
  ): WithGlobal<HP, LP>;
  new (props: {}, context?: any): React.Component<{}, {}>;
}



export default function createProvider<
  G extends {} = State,
  R extends {} = Reducers,
>(
  initialState: G = Object.create(null),
  initialReducers: R = Object.create(null),
): ReactNProvider<G, R> {

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
      reducer: Reducer<G, A>,
    ): BooleanFunction {
      return addReducer<G>(globalStateManager, name, reducer);
    }

    public static addReducers(reducers: ReducerMap<G>): BooleanFunction {
      return addReducers<G>(globalStateManager, reducers);
    }

    public static get dispatch(
    ): DispatcherMap<G, R> & AdditionalDispatchers<G> {
      return globalStateManager.dispatchers;
    }

    public static getDispatch(
    ): DispatcherMap<G, R> & AdditionalDispatchers<G> {
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

    public static useGlobal(): GlobalTuple<G>;
    public static useGlobal<Property extends keyof G>(
      property: Property,
    ): StateTuple<G, Property>;
    public static useGlobal<Property extends keyof G>(
      property?: Property,
    ): UseGlobal<G, Property> {
      return useGlobal(globalStateManager, property);
    }

    public static useGlobalReducer<A extends any[] = any[]>(
      reducer: Reducer<G, A>,
    ): Dispatcher<G, A>;
    public static useGlobalReducer<K extends keyof R = keyof R>(
      reducer: K,
    ): Dispatcher<G, ExtractA<R[K]>>;
    public static useGlobalReducer<K extends keyof R = keyof R, A extends any[] = any[]>(
      reducer: K | Reducer<G, A>,
    ): UseGlobalReducer<G, R, K, A> {

      // TypeScript required this be an if-else block with the exact same
      //   function call.
      // The generics were added to make the best of an inefficient situation.
      if (typeof reducer === 'function') {
        return useGlobalReducer<G, A>(globalStateManager, reducer);
      }
      return useGlobalReducer<G, R>(globalStateManager, reducer);
    }

    public static withGlobal<HP, LP>(
      getter: Getter<G, HP, LP> = (globalState: G): G => globalState,
      setter: Setter<G, HP, LP> = (): null => null,
    ): WithGlobal<HP, LP> {
      return withGlobal<G, HP, LP>(globalStateManager, getter, setter);
    }

    public render(): JSX.Element {
      return (
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
}
