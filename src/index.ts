import React = require('react');
import { Reducers, State } from '../default';
import { ReactNComponent, ReactNPureComponent } from './components';
import addCallback from './add-callback';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import createProvider, { ReactNProvider } from './create-provider';
import reactn from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import getGlobal from './get-global';
import { NewGlobalState } from './global-state-manager';
import removeCallback from './remove-callback';
import resetGlobal from './reset-global';
import setGlobal from './set-global';
import Callback from './typings/callback';
import Reducer, {
  AdditionalReducers,
  Dispatcher,
  ExtractArguments,
} from './typings/reducer';
import useDispatch from './use-dispatch';
import useGlobal, { GlobalTuple, StateTuple } from './use-global';
import withGlobal, { Getter, Setter, WithGlobal } from './with-global';



type BooleanFunction = () => boolean;

interface ReactN extends TypeOfReact {

  <P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any>(
    DecoratedComponent: React.ComponentClass<P, S>,
  ): ReactNTypes.ComponentClass<P, S, G, R, SS>;

  addCallback<G extends {} = State>(
    callback: Callback<G>,
  ): BooleanFunction;

  addReducer<G extends {} = State>(
    name: string,
    reducer: Reducer<G>,
  ): BooleanFunction;

  addReducers<G extends {} = State, R extends {} = Reducers>(
    reducers: AdditionalReducers<G, R>,
  ): BooleanFunction;

  Component: typeof ReactNComponent;

  createProvider<G extends {} = State, R extends {} = Reducers>(
    initialState?: G,
    initialReducers?: R,
  ): ReactNProvider<G, R>;

  default: ReactN;

  getGlobal<G extends {} = State>(): G;

  PureComponent: typeof ReactNPureComponent;

  removeCallback<G extends {} = State>(
    callback: Callback<G>,
  ): boolean;

  resetGlobal(): void;

  setGlobal<G extends {} = State>(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<G>;

  useDispatch<G extends {} = State, R extends {} = Reducers, A extends any[] = any[]>(
    reducer: Reducer<G, R, A>,
  ): Dispatcher<G, A>;

  useDispatch<G extends {} = State, R extends {} = Reducers, K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<G, ExtractArguments<R[K]>>;

  useGlobal<G extends {} = State, Property extends keyof G = keyof G>(
    property: Property,
  ): StateTuple<G, Property>;

  useGlobal<G extends {} = State>(): GlobalTuple<G>;

  withGlobal<G extends {} = State, HP extends {} = {}, LP extends {} = {}>(
    getter?: Getter<G, HP, LP>,
    setter?: Setter<G, HP, LP>,
  ): WithGlobal<HP, LP>;
}

declare namespace ReactNTypes {
  interface ComponentClass<
    P extends {} = {},
    S extends {} = {},
    G extends {} = State,
    R extends {} = Reducers,
    SS = any
  > extends React.ComponentClass<P, S> {
    new (props: P, context?: any): ReactNComponent<P, S, G, R, SS>;
  }
  class ComponentClass { }
}

type TypeOfReact = typeof React;



export = Object.assign(reactn, React, {
  addCallback: addCallback.bind(null, defaultGlobalStateManager),
  addReducer: addReducer.bind(null, defaultGlobalStateManager),
  addReducers: addReducers.bind(null, defaultGlobalStateManager),
  Component: ReactNComponent,
  createProvider,
  default: reactn,
  getGlobal: getGlobal.bind(null, defaultGlobalStateManager),
  PureComponent: ReactNPureComponent,
  removeCallback: removeCallback.bind(null, defaultGlobalStateManager),
  resetGlobal: resetGlobal.bind(null, defaultGlobalStateManager),
  setGlobal: setGlobal.bind(null, defaultGlobalStateManager),
  useDispatch: useDispatch.bind(null, null),
  useGlobal: useGlobal.bind(null, null),
  withGlobal: withGlobal.bind(null, null),
}) as ReactN & typeof ReactNTypes;
