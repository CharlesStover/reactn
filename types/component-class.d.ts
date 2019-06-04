import { ComponentClass } from 'react';
import { Reducers, State } from '../default';
import { ReactNComponent, ReactNPureComponent } from './component';
import Omit from './omit';

export interface ReactNComponentClass<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends Omit<ComponentClass<P, S>, 'constructor' | 'new'> {
  new (props: P, context?: any): ReactNComponent<P, S, G, R, SS>;
}

export interface ReactNPureComponentClass<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends Omit<ComponentClass<P, S>, 'constructor' | 'new'> {
  new (props: P, context?: any): ReactNPureComponent<P, S, G, R, SS>;
}
