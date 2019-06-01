import * as React from 'react';
import { Reducers, State } from '../default';
import Callback from '../types/callback';
import Dispatcher, { ExtractArguments } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import Reducer, { AdditionalReducers } from '../types/reducer';
import Context from './context';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import GlobalStateManager from './global-state-manager';
import setGlobal from './set-global';
import useDispatch, { UseDispatch } from './use-dispatch';
import useGlobal, { GlobalTuple, StateTuple, UseGlobal } from './use-global';
import REACT_CONTEXT_ERROR from './utils/react-context-error';
import withGlobal, { Getter, Setter, WithGlobal } from './with-global';



type BooleanFunction = () => boolean;

export interface ReactNProvider<
  G extends {} = State,
  R extends {} = Reducers,
> {
  addCallback(callback: Callback<G>): BooleanFunction;
  addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<G, R, A>,
  ): BooleanFunction;
  addReducers(reducers: AdditionalReducers<G, R>): BooleanFunction;
  dispatch: Dispatchers<G, R>;
  getDispatch(): Dispatchers<G, R>;
  getGlobal(): G;
  global: G;
  removeCallback(callback: Callback<G>): boolean;
  reset(): void;
  setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<G>;
  useDispatch<A extends any[] = any[]>(
    reducer: Reducer<G, R, A>,
  ): Dispatcher<G, A>;
  useDispatch<K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<G, ExtractArguments<R[K]>>;
  useGlobal(): GlobalTuple<G>;
  useGlobal<Property extends keyof G>(
    property: Property,
  ): StateTuple<G, Property>;
  withGlobal<HP, LP>(
    getter: Getter<G, HP, LP>,
    setter: Setter<G, HP, LP>,
  ): WithGlobal<HP, LP>;
  new (props: {}, context?: any): React.Component<{}, {}>;
}



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
    public static useDispatch<K extends keyof R = keyof R>(
      reducer: K,
    ): Dispatcher<G, ExtractArguments<R[K]>>;
    public static useDispatch<K extends keyof R = keyof R, A extends any[] = any[]>(
      reducer?: K | Reducer<G, R, A>,
    ): UseDispatch<G, R, K, A> {

      // TypeScript required this be an if-else block with the exact same
      //   function call.
      // The generics were added to make the best of an inefficient situation.
      if (typeof reducer === 'function') {
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
