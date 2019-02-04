/// <reference types="react" />

import * as React from 'react';

interface AnyObject {
  [property: string]: any;
}

type GlobalCallback = (global: GlobalState) => NewGlobal | void;

type GlobalCallbackRemover = () => void;

// TypeScript does not allow props P to be passed to static methods.
declare class GlobalComponent<P = {}, S = {}> extends React.Component<P, S> {
  static getDerivedGlobalFromProps?: (props: AnyObject, prevGloba: GlobalState, prevState: AnyObject) => NewGlobal;
  private _globalCallback: () => void;
  readonly global: Readonly<GlobalState>;
  setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
}

// TypeScript does not allow props P to be passed to static methods.
declare class GlobalPureComponent<P = {}, S = {}> extends React.PureComponent<P, S> {
  static getDerivedGlobalFromProps?: (props: AnyObject, prevGloba: GlobalState, prevState: AnyObject) => NewGlobal;
  private _globalCallback: () => void;
  readonly global: Readonly<GlobalState>;
  setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
}

type GlobalReducer = (state: GlobalState, ...args: any[]) => NewGlobal;

type GlobalPropertySetter<T> = (value: T) => void;

interface GlobalState {
  [property: string]: any;
}

type GlobalStateSetter = (newGlobal: NewGlobal, callback?: GlobalCallback) => Promise<void> | void;

type LocalReducer = (...args: any[]) => void;

type MapGlobalToProps<ComponentProps, NewProps> = (global: GlobalState, props: ComponentProps) => NewProps;

type MapSetGlobalToProps<ComponentProps, SetGlobalProps> = (setGlobal: GlobalStateSetter, props: ComponentProps) => SetGlobalProps;

type NewGlobal = NewGlobalFunction | null | Partial<GlobalState> | Promise<NewGlobalFunction> | Promise<null> | Promise<Partial<GlobalState>>;

type NewGlobalFunction = (global: GlobalState) => NewGlobal;

interface ReactN {
  (Component: React.ComponentType): typeof GlobalComponent;
  addCallback(callback: GlobalCallback): GlobalCallbackRemover;
  addReducer(name: string, reducer: GlobalReducer): void;
  Component: typeof GlobalComponent;
  default: ReactN;
  getGlobal(): GlobalState;
  PureComponent: typeof GlobalPureComponent;
  removeCallback(callback: GlobalCallback): void;
  resetGlobal(): void;
  setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
  useGlobal(): [ GlobalState, GlobalStateSetter ];
  useGlobal<T>(property: keyof GlobalState, setterOnly?: false): [ T, GlobalPropertySetter<T> ];
  useGlobal<T>(property: keyof GlobalState, setterOnly: true): GlobalPropertySetter<T>;
  useGlobal(reducer: GlobalReducer): LocalReducer;
  withGlobal<CP, GP, SGP>(getGlobal: MapGlobalToProps<CP, GP>, setGlobal?: MapSetGlobalToProps<CP, SGP>):
    (Component: React.ComponentType<CP & GP & SGP>) =>
      GlobalPureComponent<CP, any>;
}

declare const _: ReactN;
export = _;
export as namespace ReactN;
