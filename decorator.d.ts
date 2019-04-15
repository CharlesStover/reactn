import { Reducers, State } from '../default';
import { ComponentClass } from 'react';
import { ReactNComponentClass } from './components';
export default function ReactN<G extends {} = State, R extends {} = Reducers, P extends {} = {}, S extends {} = {}, SS = any>(DecoratedComponent: ComponentClass<P, S>): ReactNComponentClass<P, S, G, R, SS>;
