import { Reducers, State } from '../default';
import Callback from '../types/callback';
import {
  ReactNComponentClass,
  ReactNPureComponentClass,
} from '../types/component-class';
import Dispatcher, { ExtractArguments, PropertyDispatcher } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import Omit from '../types/omit';
import ReactNProvider from '../types/provider';
import Reducer, { AdditionalReducers, PropertyReducer } from '../types/reducer';
import { GlobalTuple, StateTuple } from '../types/use-global';
import WithGlobal, { Getter, Setter } from '../types/with-global';
import WithInit from '../types/with-init';
import { ReactNComponent, ReactNPureComponent } from './components';
import addCallback from './add-callback';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import createProvider from './create-provider';
import reactn from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import getDispatch from './get-dispatch';
import getGlobal from './get-global';
import removeCallback from './remove-callback';
import resetGlobal from './reset-global';
import setGlobal from './set-global';
import useDispatch from './use-dispatch';
import useGlobal from './use-global';
import withGlobal from './with-global';
import withInit from './with-init';
import React = require('react');



type BooleanFunction = () => boolean;

interface ReactN extends Omit<typeof React, 'Component' | 'default' | 'PureComponent'> {

  <P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any>(
    DecoratedComponent: React.ComponentClass<P, S>,
  ): ReactNTypes.ComponentClass<P, S, G, R, SS>;

  addCallback<G extends {} = State>(
    callback: Callback<G>,
  ): BooleanFunction;

  addReducer<G extends {} = State, R extends {} = Reducers, ReducerName extends keyof R = keyof R>(
    name: ReducerName,
    reducer: R[ReducerName],
  ): BooleanFunction;
  addReducer<G extends {} = State, R extends {} = Reducers>(
    name: string,
    reducer: Reducer<G, R & AdditionalReducers<G, R>>,
  ): BooleanFunction;

  addReducers<G extends {} = State, R extends {} = Reducers, AR extends AdditionalReducers<G, R> = AdditionalReducers<G, R>, ARR extends AdditionalReducers<G, R & AR> = AdditionalReducers<G, R & AR>>(
    reducers: Partial<R> & ARR,
  ): BooleanFunction;

  // This line should not need to exist, since `Component` exists on both the
  //   exported object and ReactNTypes namespace, but TravisCI fails with:
  //   Property 'Component' does not exist on type 'ReactN'.
  Component: ReactNComponentClass;

  createProvider<G extends {} = State, R extends {} = Reducers>(
    initialState?: G,
    initialReducers?: R,
  ): ReactNProvider<G, R>;

  default: ReactN;

  getDispatch<G extends {} = State, R extends {} = Reducers>(
  ): Dispatchers<G, R>;

  getGlobal<G extends {} = State>(): G;

  // This line should not need to exist, since `Component` exists on both the
  //   exported object and ReactNTypes namespace, but TravisCI fails with:
  //   Property 'PureComponent' does not exist on type 'ReactN'.
  PureComponent: ReactNPureComponentClass;

  removeCallback<G extends {} = State>(
    callback: Callback<G>,
  ): boolean;

  resetGlobal(): void;

  setGlobal<G extends {} = State>(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<G>;

  // useDispatch()
  useDispatch<G extends {} = State, R extends {} = Reducers>(
  ): Dispatchers<G, R>;

  // useDispatch(Function)
  useDispatch<G extends {} = State, R extends {} = Reducers, A extends any[] = any[]>(
    reducer: Reducer<G, R, A>,
  ): Dispatcher<G, A>;

  // useDispatch(Function, keyof State)
  useDispatch<G extends {} = State, R extends {} = Reducers, P extends keyof G = keyof G, A extends any[] = any[]>(
    reducer: PropertyReducer<G, P, A>,
    property: P,
  ): PropertyDispatcher<G, P, A>;

  // useDispatch(keyof Reducers)
  useDispatch<G extends {} = State, R extends {} = Reducers, K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<G, ExtractArguments<R[K]>>;

  // useGlobal(keyof State)
  useGlobal<G extends {} = State, Property extends keyof G = keyof G>(
    property: Property,
  ): StateTuple<G, Property>;

  // useGlobal()
  useGlobal<G extends {} = State>(): GlobalTuple<G>;

  withGlobal<G extends {} = State, R extends {} = Reducers, HP extends {} = {}, LP extends {} = {}>(
    getter?: Getter<G, R, HP, LP>,
    setter?: Setter<G, R, HP, LP>,
  ): WithGlobal<HP, LP>;

  withInit<G extends {} = State, R extends {} = Reducers, P extends {} = {}>(
    initialGlobal?: NewGlobalState<G> | null,
    initialReducers?: null | R,
  ): WithInit<P, G, R>;
}

declare namespace ReactNTypes {

  interface Component<
    P extends {} = {},
    S extends {} = {},
    G extends {} = State,
    R extends {} = Reducers,
    SS = any,
  > extends ReactNComponent<P, S, G, R, SS> { }

  interface ComponentClass<
    P extends {} = {},
    S extends {} = {},
    G extends {} = State,
    R extends {} = Reducers,
    SS = any,
  > extends ReactNComponentClass<P, S, G, R, SS> { }

  interface PureComponent<
    P extends {} = {},
    S extends {} = {},
    G extends {} = State,
    R extends {} = Reducers,
    SS = any,
  > extends ReactNPureComponent<P, S, G, R, SS> { }

  interface PureComponentClass<
    P extends {} = {},
    S extends {} = {},
    G extends {} = State,
    R extends {} = Reducers,
    SS = any,
  > extends ReactNPureComponentClass<P, S, G, R, SS> { }

  class Component { }
  class ComponentClass { }
  class PureComponent { }
  class PureComponentClass { }
}



export = Object.assign(reactn, React, {
  addCallback: addCallback.bind(null, defaultGlobalStateManager),
  addReducer: addReducer.bind(null, defaultGlobalStateManager),
  addReducers: addReducers.bind(null, defaultGlobalStateManager),
  Component: ReactNComponent,
  createProvider,
  default: reactn,
  getDispatch: getDispatch.bind(null, defaultGlobalStateManager),
  getGlobal: getGlobal.bind(null, defaultGlobalStateManager),
  PureComponent: ReactNPureComponent,
  removeCallback: removeCallback.bind(null, defaultGlobalStateManager),
  resetGlobal: resetGlobal.bind(null, defaultGlobalStateManager),
  setGlobal: setGlobal.bind(null, defaultGlobalStateManager),
  useDispatch: useDispatch.bind(null, null),
  useGlobal: useGlobal.bind(null, null),
  withGlobal: withGlobal.bind(null, null),
  withInit,
}) as ReactN & typeof ReactNTypes;
