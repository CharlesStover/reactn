import React from 'react';
import { ReactNComponent, ReactNPureComponent } from './components';
import { ReactNProvider } from './create-provider';
import reactn from './decorator';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import Reducer, { Reducers } from './typings/reducer';
import {
  GlobalTuple,
  Setter as UseGlobalSetter,
  StateTuple,
  UseGlobal,
} from './use-global';
import {
  Getter,
  Setter as WithGlobalSetter,
  WithGlobal,
} from './with-global';




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



declare const _export: ReactN & typeof ReactNTypes;
export = _export;
