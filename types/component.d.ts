import { Component, PureComponent } from 'react';
import { Reducers, State } from '../default';
import Callback from './callback';
import { DispatcherMap } from './dispatchers'
import NewGlobalState from './new-global-state';



export interface ReactNComponent<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends Component<P, S, SS> {
  dispatch: Readonly<DispatcherMap<G, R>>;
  global: Readonly<G>;
  _globalCallback(): void;
  setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<Readonly<G>>;
}

export interface ReactNPureComponent<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends PureComponent<P, S, SS> {
  dispatch: Readonly<DispatcherMap<G, R>>;
  global: Readonly<G>;
  _globalCallback(): void;
  setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<Readonly<G>>;
}
