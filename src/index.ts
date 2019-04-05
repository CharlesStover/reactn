import React = require('react');
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
import Reducer, { Dispatcher, ExtractA, Reducers } from './typings/reducer';
import useGlobal, { GlobalTuple, StateTuple } from './use-global';
import useGlobalReducer from './use-global-reducer';
import withGlobal, { Getter, Setter, WithGlobal } from './with-global';



type BooleanFunction = () => boolean;

interface ReactN extends TypeOfReact {

  <P extends {} = {}, S extends {} = {}, GS extends {} = {}, R extends {} = {}, SS = any>(
    DecoratedComponent: React.ComponentClass<P, S>,
  ): ReactNTypes.ComponentClass<P, S, GS, R, SS>;

  addCallback<GS extends {} = {}>(
    callback: Callback<GS>,
  ): BooleanFunction;

  addReducer<GS extends {} = {}>(
    name: string,
    reducer: Reducer<GS>,
  ): BooleanFunction;

  addReducers<GS extends {} = {}>(
    reducers: Reducers<GS>,
  ): BooleanFunction;

  Component: typeof ReactNComponent

  createProvider<GS extends {} = {}, R extends {} = {}>(
    initialState?: GS,
    initialReducers?: R,
  ): ReactNProvider<GS, R>;

  default: ReactN;

  getGlobal<GS extends {} = {}>(): GS;

  PureComponent: typeof ReactNPureComponent;

  removeCallback<GS extends {} = {}>(
    callback: Callback<GS>,
  ): boolean;

  resetGlobal(): void;

  setGlobal<GS extends {} = {}>(
    newGlobalState: NewGlobalState<GS>,
    callback?: Callback<GS>,
  ): Promise<GS>;

  useGlobal<GS extends {} = {}, Property extends keyof GS = keyof GS>(
    property: Property,
  ): StateTuple<GS, Property>;

  useGlobal<GS extends {} = {}>(): GlobalTuple<GS>;

  useGlobalReducer<GS extends {} = {}, R extends {} = {}, K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<GS, ExtractA<R[K]>>;

  useGlobalReducer<GS extends {} = {}, A extends any[] = any[]>(
    reducer: Reducer<GS, A>,
  ): Dispatcher<GS, A>;

  withGlobal<GS extends {} = {}, HP extends {} = {}, LP extends {} = {}>(
    getter?: Getter<GS, HP, LP>,
    setter?: Setter<GS, HP, LP>,
  ): WithGlobal<HP, LP>;
}

declare namespace ReactNTypes {

  interface ComponentClass<
    P extends {} = {},
    S extends {} = {},
    GS extends {} = {},
    R extends {} = {},
    SS = any
  > extends React.ComponentClass<P, S> {
    new (props: P, context?: any): ReactNComponent<P, S, GS, R, SS>;
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
  useGlobal: useGlobal.bind(null, null),
  useGlobalReducer: useGlobalReducer.bind(null, null),
  withGlobal: withGlobal.bind(null, null),
}) as ReactN & typeof ReactNTypes;
