import { Reducers, State } from '../default';
import { Action as ReduxAction, Dispatch as ReduxDispatch } from 'redux';
import Callback from './typings/callback';
import Reducer, { AdditionalDispatchers, Dispatcher, DispatcherMap, ExtractA } from './typings/reducer';
interface AdditionalReducers<GS> {
    [name: string]: Reducer<GS, any>;
}
interface AsynchronousNewGlobalState<Shape> extends Promise<NewGlobalState<Shape>> {
}
declare type BooleanFunction = () => boolean;
interface FunctionalNewGlobalState<Shape> {
    (globalState: Shape): NewGlobalState<Shape>;
}
export declare type NewGlobalState<Shape> = AsynchronousNewGlobalState<Shape> | FunctionalNewGlobalState<Shape> | SynchronousNewGlobalState<Shape>;
export declare type PropertyListener = () => void;
interface ReduxDevToolsAction<GS, T = 'STATE_CHANGE'> extends ReduxAction<T> {
    stateChange: Partial<GS>;
}
declare type SynchronousNewGlobalState<Shape> = null | Partial<Shape> | void;
export declare const INVALID_NEW_GLOBAL_STATE: Error;
export default class GlobalStateManager<G extends {} = State, R extends {} = Reducers> {
    private _callbacks;
    private _dispatchers;
    private _initialReducers;
    private _initialState;
    private _propertyListeners;
    private _queue;
    private _reduxDevToolsDispatch;
    private _state;
    constructor(initialState?: G, initialReducers?: R);
    addCallback(callback: Callback<G>): BooleanFunction;
    addPropertyListener(property: keyof G, propertyListener: PropertyListener): void;
    addDispatcher<A extends any[] = any[]>(name: string, reducer: Reducer<G, A>): BooleanFunction;
    addDispatchers(reducers: AdditionalReducers<G>): void;
    clearQueue(): void;
    createDispatcher<A extends any[] = []>(reducer: Reducer<G, A>): Dispatcher<G, A>;
    readonly dispatchers: DispatcherMap<G, R> & AdditionalDispatchers<G>;
    enqueue<Property extends keyof G>(property: Property, value: G[Property]): void;
    flush(): void;
    getDispatcher<K extends keyof R>(name: K): Dispatcher<G, ExtractA<R[K]>>;
    hasCallback(callback: Callback<G>): boolean;
    hasDispatcher(name: keyof R | string): boolean;
    hasPropertyListener(pl: PropertyListener): boolean;
    readonly queue: Map<keyof G, G[keyof G]>;
    readonly propertyListeners: Map<keyof G, Set<PropertyListener>>;
    readonly reduxDevToolsDispatch: ReduxDispatch<ReduxDevToolsAction<G>>;
    removeCallback(callback: Callback<G>): boolean;
    removeDispatcher(dispatcherName: string): boolean;
    removePropertyListener(propertyListener: PropertyListener): boolean;
    reset(): void;
    set(newGlobalState: NewGlobalState<G>): Promise<G>;
    setFunction(f: FunctionalNewGlobalState<G>): Promise<G>;
    setObject<O extends Partial<G> = Partial<G>>(obj: O): Promise<G>;
    setPromise(promise: Promise<NewGlobalState<G>>): Promise<G>;
    spyState(propertyListener: PropertyListener): G;
    readonly state: Readonly<G>;
}
export {};
