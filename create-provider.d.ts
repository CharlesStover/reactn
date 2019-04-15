import { Reducers, State } from '../default';
import * as React from 'react';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import Reducer, { AdditionalDispatchers, Dispatcher, DispatcherMap, ExtractA, ReducerMap } from './typings/reducer';
import { GlobalTuple, StateTuple } from './use-global';
import { Getter, Setter, WithGlobal } from './with-global';
declare type BooleanFunction = () => boolean;
export interface ReactNProvider<G extends {} = State, R extends {} = Reducers> {
    addCallback(callback: Callback<G>): BooleanFunction;
    addReducer<A extends any[] = any[]>(name: string, reducer: Reducer<G, A>): BooleanFunction;
    addReducers(reducers: ReducerMap<G>): BooleanFunction;
    dispatch: DispatcherMap<G, R> & AdditionalDispatchers<G>;
    getDispatch(): DispatcherMap<G, R> & AdditionalDispatchers<G>;
    getGlobal(): G;
    global: G;
    removeCallback(callback: Callback<G>): boolean;
    reset(): void;
    setGlobal(newGlobalState: NewGlobalState<G>, callback?: Callback<G>): Promise<G>;
    useGlobal(): GlobalTuple<G>;
    useGlobal<Property extends keyof G>(property: Property): StateTuple<G, Property>;
    useGlobalReducer<A extends any[] = any[]>(reducer: Reducer<G, A>): Dispatcher<G, A>;
    useGlobalReducer<K extends keyof R = keyof R>(reducer: K): Dispatcher<G, ExtractA<R[K]>>;
    withGlobal<HP, LP>(getter: Getter<G, HP, LP>, setter: Setter<G, HP, LP>): WithGlobal<HP, LP>;
    new (props: {}, context?: any): React.Component<{}, {}>;
}
export default function createProvider<G extends {} = State, R extends {} = Reducers>(initialState?: G, initialReducers?: R): ReactNProvider<G, R>;
export {};
