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
  Dispatchers,
  ExtractA,
  Reducers,
} from './typings/reducer';
import useGlobal, { GlobalTuple, StateTuple, UseGlobal } from './use-global';
import useGlobalReducer, { UseGlobalReducer } from './use-global-reducer';
import withGlobal, { Getter, Setter, WithGlobal } from './with-global';



type BooleanFunction = () => boolean;

export interface ReactNProvider<
  GS extends {} = {},
  R extends {} = {},
> {
  addCallback(callback: Callback<GS>): BooleanFunction;
  addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<GS, A>,
  ): BooleanFunction;
  addReducers(reducers: Reducers<GS>): BooleanFunction;
  dispatch: Dispatchers<GS, R> & AdditionalDispatchers<GS>;
  getDispatch(): Dispatchers<GS, R> & AdditionalDispatchers<GS>;
  getGlobal(): GS;
  global: GS;
  removeCallback(callback: Callback<GS>): boolean;
  reset(): void;
  setGlobal(
    newGlobalState: NewGlobalState<GS>,
    callback?: Callback<GS>,
  ): Promise<GS>;
  useGlobal(): GlobalTuple<GS>;
  useGlobal<Property extends keyof GS>(
    property: Property,
  ): StateTuple<GS, Property>;
  useGlobalReducer<A extends any[] = any[]>(
    reducer: Reducer<GS, A>,
  ): Dispatcher<GS, A>;
  useGlobalReducer<K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<GS, ExtractA<R[K]>>;
  withGlobal<HP, LP>(
    getter: Getter<GS, HP, LP>,
    setter: Setter<GS, HP, LP>,
  ): WithGlobal<HP, LP>;
  new (props: {}, context?: any): React.Component<{}, {}>;
}



export default function createProvider<
  GS extends {} = {},
  R extends {} = {},
>(
  initialState: GS = Object.create(null),
  initialReducers: R = Object.create(null),
): ReactNProvider<GS, R> {

  const globalStateManager = new GlobalStateManager<GS, R>(
    initialState,
    initialReducers,
  );

  return class ReactNProvider extends React.Component<{}, {}> {

    public static addCallback(f: Callback<GS>): BooleanFunction {
      return globalStateManager.addCallback(f);
    }

    public static addReducer<A extends any[] = any[]>(
      name: string,
      reducer: Reducer<GS, A>,
    ): BooleanFunction {
      return addReducer<GS>(globalStateManager, name, reducer);
    }

    public static addReducers(reducers: Reducers<GS>): BooleanFunction {
      return addReducers<GS>(globalStateManager, reducers);
    }

    public static get dispatch(
    ): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
      return globalStateManager.dispatchers;
    }

    public static getDispatch(
    ): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
      return globalStateManager.dispatchers;
    }

    public static getGlobal(): GS {
      return globalStateManager.state;
    }

    public static get global(): GS {
      return globalStateManager.state;
    }

    public static removeCallback(callback: Callback<GS>): boolean {
      return globalStateManager.removeCallback(callback);
    }

    public static reset(): void {
      return globalStateManager.reset();
    }

    public static setGlobal(
      newGlobalState: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> {
      return setGlobal<GS>(globalStateManager, newGlobalState, callback);
    }

    public static useGlobal(): GlobalTuple<GS>;
    public static useGlobal<Property extends keyof GS>(
      property: Property,
    ): StateTuple<GS, Property>;
    public static useGlobal<Property extends keyof GS>(
      property?: Property,
    ): UseGlobal<GS, Property> {
      return useGlobal(globalStateManager, property);
    }

    public static useGlobalReducer<A extends any[] = any[]>(
      reducer: Reducer<GS, A>,
    ): Dispatcher<GS, A>;
    public static useGlobalReducer<K extends keyof R = keyof R>(
      reducer: K,
    ): Dispatcher<GS, ExtractA<R[K]>>;
    public static useGlobalReducer<K extends keyof R = keyof R, A extends any[] = any[]>(
      reducer: K | Reducer<GS, A>,
    ): UseGlobalReducer<GS, R, K, A> {

      // TypeScript required this be an if-else block with the exact same
      //   function call.
      // The generics were added to make the best of an inefficient situation.
      if (typeof reducer === 'function') {
        return useGlobalReducer<GS, A>(globalStateManager, reducer);
      }
      return useGlobalReducer<GS, R>(globalStateManager, reducer);
    }

    public static withGlobal<HP, LP>(
      getter: Getter<GS, HP, LP> = (globalState: GS): GS => globalState,
      setter: Setter<GS, HP, LP> = (): null => null,
    ): WithGlobal<HP, LP> {
      return withGlobal<GS, HP, LP>(globalStateManager, getter, setter);
    }

    public render(): JSX.Element {
      return (
        // @ts-ignore: Type 'GlobalStateManager<GS, R>' is not assignable to
        //   type 'GlobalStateManager<Record<ReactText, any>, Record<ReactText,
        //   any>>'.
        // Type 'Record<ReactText, any>' is not assignable to type 'GS'.
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
}
