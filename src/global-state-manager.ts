import { Reducers, State } from '../default';
import {
  Action as ReduxAction,
  AnyAction as ReduxAnyAction,
  DeepPartial as ReduxDeepPartial,
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
  Store as ReduxStore,
  StoreEnhancer as ReduxStoreEnhancer,
  StoreEnhancerStoreCreator as ReduxStoreEnhancerStoreCreator,
} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import Callback from './typings/callback';
import Reducer, {
  AdditionalDispatchers,
  Dispatcher,
  DispatcherMap,
  ExtractA,
} from './typings/reducer';
import objectGetListener from './utils/object-get-listener';



interface AdditionalReducers<GS> {
  [name: string]: Reducer<GS, any>;
}

// AsynchronousNewGlobalState is an interface so that NewGlobalState does not
//   circularly reference itself.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsynchronousNewGlobalState<Shape>
  extends Promise<NewGlobalState<Shape>> { }

type BooleanFunction = () => boolean;

interface FunctionalNewGlobalState<Shape> {
  (globalState: Shape): NewGlobalState<Shape>;
}

export type NewGlobalState<Shape> =
  AsynchronousNewGlobalState<Shape> |
  FunctionalNewGlobalState<Shape> |
  SynchronousNewGlobalState<Shape>;

// type PartialState<Shape> = Shape extends {} ? Partial<Shape> : Shape;

export type PropertyListener = () => void;

interface ReduxDevToolsAction<GS, T = 'STATE_CHANGE'> extends ReduxAction<T> {
  stateChange: Partial<GS>;
}

type SynchronousNewGlobalState<Shape> = null | Partial<Shape> | void;

interface Window<GS> {
  __REDUX_DEVTOOLS_EXTENSION__?: typeof devToolsEnhancer;
}



const copyObject = <Shape>(obj: Shape): Shape =>
  Object.assign(
    Object.create(null),
    obj,
  );

export const INVALID_NEW_GLOBAL_STATE: Error = new Error(
  'ReactN global state must be a function, null, object, or Promise.',
);

declare const window: Window<any> | void;



export default class GlobalStateManager<
  G extends {} = State,
  R extends {} = Reducers,
> {

  private _callbacks: Set<Callback<G>> = new Set<Callback<G>>();
  private _dispatchers: DispatcherMap<G, R> & AdditionalDispatchers<G> =
    Object.create(null);
  private _initialReducers: R;
  private _initialState: G;
  private _propertyListeners: Map<keyof G, Set<PropertyListener>> =
    new Map<keyof G, Set<PropertyListener>>();
  private _queue: Map<keyof G, G[keyof G]> =
    new Map<keyof G, G[keyof G]>();
  private _reduxEnhancedStore: ReduxStore<G & any, ReduxDevToolsAction<G>> =
    null;
  private _state: G;

  public constructor(
    initialState: G = Object.create(null),
    initialReducers: R = Object.create(null),
  ) {
    if (
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION__
    ) {
      const enhancer: ReduxStoreEnhancer<G> =
        (window as Window<G>).__REDUX_DEVTOOLS_EXTENSION__({
          name: 'ReactN state',
        });
      const enhancerStoreCreator: ReduxStoreEnhancerStoreCreator<{}, G> = <
        S = any,
        A extends ReduxAnyAction = ReduxDevToolsAction<G>,
      >(
        _reducer: ReduxReducer<S, A>,
        _preloadedState: ReduxDeepPartial<S>,
      ): ReduxStore<S & G, A> => ({
        dispatch: <T extends ReduxAnyAction>(action: T): T => action,
        getState: (): any => this.state,
        replaceReducer: () => null,
        subscribe: () => null,
      });
      this._reduxEnhancedStore =
        enhancer(enhancerStoreCreator)(
          // Using `G` instead of `any` results in TypeScript error:
          //   Type instantiation is excessively deep and possibly infinite.
          (): any => this.state,
          initialState,
        );
    }
    this._initialReducers = copyObject(initialReducers);
    this._initialState = copyObject(initialState);
    this._state = copyObject(initialState);
    this.addDispatchers(initialReducers);
  }

  public addCallback(callback: Callback<G>): BooleanFunction {
    this._callbacks.add(callback);
    return (): boolean =>
      this.removeCallback(callback);
  }

  // Map component instance to a state property.
  public addPropertyListener(
    property: keyof G,
    propertyListener: PropertyListener,
  ): void {

    // If property listeners already exist for this property,
    //   add this one to the set.
    if (this.propertyListeners.has(property)) {
      this.propertyListeners.get(property).add(propertyListener);
    }

    // If property listeners don't already exist for this property,
    //   create a set of property listeners that includes this one.
    else {
      this.propertyListeners.set(property, new Set([ propertyListener ]));
    }
  }

  public addDispatcher<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<G, A>,
  ): BooleanFunction {
    this._dispatchers[name] = this.createDispatcher(reducer);
    return (): boolean =>
      this.removeDispatcher(name);
  }

  public addDispatchers(reducers: AdditionalReducers<G>): void {
    for (const [ name, reducer ] of Object.entries(reducers)) {
      this.addDispatcher(name, reducer);
    }
  }

  public clearQueue(): void {
    return this.queue.clear();
  }

  public createDispatcher<A extends any[] = []>(
    reducer: Reducer<G, A>,
  ): Dispatcher<G, A> {
    return (...args: A): Promise<G> =>
      this.set(
        reducer(this.state, ...args),
      );
  }

  public get dispatchers(): DispatcherMap<G, R> & AdditionalDispatchers<G> {
    return copyObject(this._dispatchers);
  }

  public enqueue<Property extends keyof G>(
    property: Property,
    value: G[Property],
  ): void {
    this._queue.set(property, value);
  }

  // Flush the queue.
  public flush(): void {
    const propertyListeners = new Set();

    // Commit all state changes.
    for (const [ property, value ] of this.queue.entries()) {
      this._state[property] = value;

      // Accumulate listeners for this property change.
      if (this.propertyListeners.has(property)) {
        for (const propertyListener of this.propertyListeners.get(property)) {
          propertyListeners.add(propertyListener);
        }
      }
    }

    this.clearQueue();

    // Force update all components that were a part of the queue.
    for (const propertyListener of propertyListeners) {
      propertyListener();
    }

    // Call each global callback.
    for (const callback of this._callbacks) {
      this.set(callback(this.state));
    }
  }

  public getDispatcher<K extends keyof R>(
    name: K,
  ): Dispatcher<G, ExtractA<R[K]>> {
    if (this.hasDispatcher(name)) {
      return this._dispatchers[name];
    }
    throw new Error(`Cannot return unknown ReactN reducer \`${name}\`.`);
  }

  public hasCallback(callback: Callback<G>): boolean {
    return this._callbacks.has(callback);
  }

  public hasDispatcher(name: keyof R | string): boolean {
    return Object.prototype.hasOwnProperty.call(this._dispatchers, name);
  }

  public hasPropertyListener(pl: PropertyListener): boolean {
    for (const propertyListeners of this.propertyListeners.values()) {
      for (const propertyListener of propertyListeners) {
        if (propertyListener === pl) {
          return true;
        }
      }
    }
    return false;
  }

  public get queue(): Map<keyof G, G[keyof G]> {
    return this._queue;
  }

  public get propertyListeners(): Map<keyof G, Set<PropertyListener>> {
    return this._propertyListeners;
  }

  public get reduxEnhancedStore(
  ): ReduxStore<G & any, ReduxDevToolsAction<G>> {
    return this._reduxEnhancedStore;
  }

  public removeCallback(callback: Callback<G>): boolean {
    return this._callbacks.delete(callback);
  }

  public removeDispatcher(dispatcherName: string): boolean {
    if (this.hasDispatcher(dispatcherName)) {
      delete this._dispatchers[dispatcherName];
      return true;
    }
    return false;
  }

  // Unmap a component instance from all state properties.
  public removePropertyListener(propertyListener: PropertyListener): boolean {
    let removed = false;

    // Remove this property listener from the global state.
    for (const propertyListeners of this.propertyListeners.values()) {
      removed = removed || propertyListeners.delete(propertyListener);
    }

    return removed;
  }

  // Reset the global state.
  public reset(): void {

    // Clear.
    this._callbacks.clear();
    this._dispatchers = Object.create(null);
    this._propertyListeners.clear();
    this._queue.clear();

    // Prepopulate.
    this.addDispatchers(this._initialReducers);
    this._state = copyObject(this._initialState);
  }

  // Set any type of state change.
  public set(newGlobalState: NewGlobalState<G>): Promise<G> {

    // No changes, e.g. getDerivedGlobalFromProps.
    if (
      newGlobalState === null ||
      typeof newGlobalState === 'undefined'
    ) {
      return Promise.resolve(this.state);
    }

    if (newGlobalState instanceof Promise) {
      return this.setPromise(newGlobalState);
    }

    if (typeof newGlobalState === 'function') {
      return this.setFunction(newGlobalState);
    }

    // Redux Dev Tools
    const reduxEnhancedStore = this.reduxEnhancedStore;
    if (reduxEnhancedStore) {
      reduxEnhancedStore.dispatch({
        stateChange: newGlobalState,
        type: 'STATE_CHANGE',
      });
    }

    if (typeof newGlobalState === 'object') {
      return this.setObject(newGlobalState);
    }

    throw INVALID_NEW_GLOBAL_STATE;
  }

  public setFunction(f: FunctionalNewGlobalState<G>): Promise<G> {
    return this.set(f(this.state));
  }

  // Set the state's property-value pairs via an object.
  public setObject<O extends Partial<G> = Partial<G>>(obj: O): Promise<G> {
    const properties: (keyof G)[] = Object.keys(obj) as (keyof G)[];
    for (const property of properties) {
      const value: G[keyof G] = obj[property] as G[keyof G];
      this.enqueue(property, value);
    }
    this.flush();
    return Promise.resolve(this.state);
  }

  // Set the state's property-value pairs via a promise.
  public setPromise(
    promise: Promise<NewGlobalState<G>>
  ): Promise<G> {
    return promise
      .then((result: NewGlobalState<G>): Promise<G> =>
        this.set(result)
      );
  }

  public spyState(propertyListener: PropertyListener): G {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      (property: keyof G) => {
        this.addPropertyListener(property, propertyListener);
      },
    );
  }

  public get state(): Readonly<G> {
    return copyObject(this._state);
  }
};
