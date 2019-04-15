import React = require('react');
import { Reducers, State } from '../default';
import { ReactNComponent, ReactNPureComponent } from './components';
import { ReactNProvider } from './create-provider';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import Reducer, { Dispatcher, ExtractA, ReducerMap } from './typings/reducer';
import { GlobalTuple, StateTuple } from './use-global';
import { Getter, Setter, WithGlobal } from './with-global';
declare type BooleanFunction = () => boolean;
interface ReactN extends TypeOfReact {
    <P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any>(DecoratedComponent: React.ComponentClass<P, S>): ReactNTypes.ComponentClass<P, S, G, R, SS>;
    addCallback<G extends {} = State>(callback: Callback<G>): BooleanFunction;
    addReducer<G extends {} = State>(name: string, reducer: Reducer<G>): BooleanFunction;
    addReducers<G extends {} = State>(reducers: ReducerMap<G>): BooleanFunction;
    Component: typeof ReactNComponent;
    createProvider<G extends {} = State, R extends {} = Reducers>(initialState?: G, initialReducers?: R): ReactNProvider<G, R>;
    default: ReactN;
    getGlobal<G extends {} = State>(): G;
    PureComponent: typeof ReactNPureComponent;
    removeCallback<G extends {} = State>(callback: Callback<G>): boolean;
    resetGlobal(): void;
    setGlobal<G extends {} = State>(newGlobalState: NewGlobalState<G>, callback?: Callback<G>): Promise<G>;
    useGlobal<G extends {} = State, Property extends keyof G = keyof G>(property: Property): StateTuple<G, Property>;
    useGlobal<G extends {} = State>(): GlobalTuple<G>;
    useGlobalReducer<G extends {} = State, R extends {} = Reducers, K extends keyof R = keyof R>(reducer: K): Dispatcher<G, ExtractA<R[K]>>;
    useGlobalReducer<G extends {} = State, A extends any[] = any[]>(reducer: Reducer<G, A>): Dispatcher<G, A>;
    withGlobal<G extends {} = State, HP extends {} = {}, LP extends {} = {}>(getter?: Getter<G, HP, LP>, setter?: Setter<G, HP, LP>): WithGlobal<HP, LP>;
}
declare namespace ReactNTypes {
    interface ComponentClass<P extends {} = {}, S extends {} = {}, G extends {} = State, R extends {} = Reducers, SS = any> extends React.ComponentClass<P, S> {
        new (props: P, context?: any): ReactNComponent<P, S, G, R, SS>;
    }
    class ComponentClass {
    }
}
declare type TypeOfReact = typeof React;
declare const _default: ReactN & typeof ReactNTypes;
export = _default;
