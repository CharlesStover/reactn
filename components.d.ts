import { Reducers, State } from '../default';
import { Component, ComponentClass, PureComponent } from 'react';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import { DispatcherMap } from './typings/reducer';
export interface ReactNComponentClass<P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any> extends ComponentClass<P, S> {
    new (props: P, context?: any): ReactNComponent<P, S, G, R, SS>;
}
export interface ReactNPureComponentClass<P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any> extends ComponentClass<P, S> {
    new (props: P, context?: any): ReactNPureComponent<P, S, G, R, SS>;
}
export declare class ReactNComponent<P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any> extends Component<P, S, SS> {
    constructor(props: Readonly<P>, context?: any);
    readonly dispatch: Readonly<DispatcherMap<G, R>>;
    readonly global: Readonly<G>;
    setGlobal(newGlobalState: NewGlobalState<G>, callback?: Callback<G> | null): Promise<Readonly<G>>;
    _globalCallback(): void;
}
export declare class ReactNPureComponent<P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any> extends PureComponent<P, S, SS> {
    constructor(props: Readonly<P>, context?: any);
    readonly dispatch: Readonly<DispatcherMap<G, R>>;
    readonly global: Readonly<G>;
    setGlobal(newGlobalState: NewGlobalState<G>, callback?: Callback<G> | null): Promise<Readonly<G>>;
    _globalCallback(): void;
}
