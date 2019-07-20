import { ComponentClass, FunctionComponent } from 'react';
import { Reducers, State } from '../default';
import Callback from './callback';
import Dispatchers from './dispatchers';
import NewGlobalState from './new-global-state';

export type Getter<
  G extends {} = State,
  R extends {} = Reducers,
  HP extends {} = {},
  LP extends {} = {},
> = (global: G, dispatch: Dispatchers<G, R>, props: HP) =>
  null | Partial<LP> | void;

type SetGlobal<G extends {} = State> = (
  newGlobalState: NewGlobalState<G>,
  callback?: Callback<G>,
) => Promise<G>;

export type Setter<
  G extends {} = State,
  R extends {} = Reducers,
  HP extends {} = {},
  LP extends {} = {},
> = (setGlobal: SetGlobal<G>, dispatch: Dispatchers<G, R>, props: HP) =>
  null | Partial<LP> | void;

type WithGlobal<HP extends {} = {}, LP extends {} = {}> =
  (Component: React.ComponentType<LP> | string) => ComponentClass<HP>;

export default WithGlobal;
