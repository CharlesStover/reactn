import { ComponentClass, ComponentType } from 'react';
import { Reducers, State } from '../default';
import { ReactNComponentClass } from './component-class';

export interface WithInitState {
  global: boolean;
  reducers: boolean;
}

type WithInit<
  P extends {} = {},
  G extends {} = State,
  R extends {} = Reducers
> = (
  Component: ComponentType<P> | string,
  FallbackComponent?: ComponentType<P> | null | string,
) => ReactNComponentClass<P, WithInitState, G, R>;

export default WithInit;
