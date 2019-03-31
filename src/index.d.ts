import React = require('react');
import { ReactNComponent, ReactNPureComponent } from './components';
import reactn from './decorator';
import { NewGlobalState } from './global-state-manager';
import createProvider from './helpers/create-provider';
import {
  GlobalTuple,
  Setter as UseGlobalSetter,
  StateTuple,
  UseGlobal,
} from './helpers/use-global';
import {
  Getter,
  Setter as WithGlobalSetter,
  WithGlobal,
} from './helpers/with-global';
import Callback from './typings/callback';
import Reducer, { Reducers } from './typings/reducer';



type BooleanFunction = () => boolean;

type Decorator = typeof reactn;

declare namespace ReactN {
  type ComponentClass = ReactNComponentClass;
}

declare interface ReactN extends Decorator, TypeOfReact {
  <P extends {} = {}, S extends {} = {}, GS extends {} = {}, R extends {} = {}, SS = any>(
    DecoratedComponent: React.ComponentClass<P, S>,
  ): ReactNComponentClass<P, S, GS, R, SS>;
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
  Component: typeof ReactNComponent;
  ComponentClass: ReactNComponentClass;
  createProvider: typeof createProvider;
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
  useGlobal<GS extends {} = {}>(): GlobalTuple<GS>;
  useGlobal<GS extends {}, Property extends keyof GS>(
    property: Property,
    setterOnly?: false,
  ): StateTuple<GS, Property>;
  useGlobal<GS extends {}, Property extends keyof GS>(
    property: Property,
    setterOnly: true,
  ): UseGlobalSetter<GS, Property>;
  withGlobal<GS extends {} = {}, HP extends {} = {}, LP extends {} = {}>(
    getter?: Getter<GS, HP, LP>,
    setter?: WithGlobalSetter<GS, HP, LP>,
  ): WithGlobal<HP, LP>;
}

interface ReactNComponentClass<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  R extends {} = {},
  SS = any,
> extends React.ComponentClass<P, S> {
  new (props: P, context?: any): ReactNComponent<P, S, GS, R, SS>;
}

type TypeOfReact = typeof React;



export = ReactN;
export as namespace ReactN;
