import { Reducers, State } from '../default';
import Callback from './typings/callback';
import Reducer, {
  Dispatcher,
  Dispatchers,
  ExtractArguments,
} from './typings/reducer';
import objectGetListener from './utils/object-get-listener';
import {
  createReduxEnhancedStore,
  DevToolAction,
  ReduxEnhancedStore,
  Window,
} from './utils/redux-dev-tools';



interface AdditionalReducers<G extends {} = State> {
  [name: string]: Reducer<G, any>;
}

// AsynchronousNewGlobalState is an interface so that NewGlobalState does not
//   circularly reference itself.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsynchronousNewGlobalState<G extends {} = State>
  extends Promise<NewGlobalState<G>> { }

type BooleanFunction = () => boolean;

interface FunctionalNewGlobalState<G extends {} = State> {
  (global: G): NewGlobalState<G>;
}

export type NewGlobalState<G extends {} = State> =
  AsynchronousNewGlobalState<G> |
  FunctionalNewGlobalState<G> |
  SynchronousNewGlobalState<G>;

// type PartialState<Shape> = Shape extends {} ? Partial<Shape> : Shape;

export type PropertyListener = () => void;

type SynchronousNewGlobalState<G extends {} = State> =
  null | Partial<G> | void;





const copyObject = <Shape>(obj: Shape): Shape =>
  Object.assign(
    Object.create(null),
    obj,
  );

export const INVALID_NEW_GLOBAL_STATE: Error = new Error(
  'ReactN global state must be a function, null, object, or Promise.',
);

declare const window: Window | void;



export default class GlobalStateManager<
  G extends {} = State,
  R extends {} = Reducers,
> {

  private _callbacks: Set<Callback<G>> = new Set<Callback<G>>();
  private _dispatchers: Dispatchers<G, R> =
    Object.create(null);
  private _initialReducers: R;
  private _initialState: G;
  private _propertyListeners: Map<keyof G, Set<PropertyListener>> =
    new Map<keyof G, Set<PropertyListener>>();
  private _queue: Map<keyof G, G[keyof G]> =
    new Map<keyof G, G[keyof G]>();
  private _reduxEnhancedStore: ReduxEnhancedStore<G> = null;
  private _state: G;

  public constructor(
    initialState: G = Object.create(null),
    initialReducers: R = Object.create(null),
  ) {
    this._initialReducers = copyObject(initialReducers);
    this._initialState = copyObject(initialState);
    this._state = copyObject(initialState);
    this._reduxEnhancedStore = createReduxEnhancedStore(this);
    this.addReducers(initialReducers);
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

  public addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<G, R, A>,
  ): BooleanFunction {
    this._dispatchers[name] = this.createDispatcher(reducer, name);
    return (): boolean =>
      this.removeDispatcher(name);
  }

  public addReducers(reducers: AdditionalReducers<G>): void {
    for (const [ name, reducer ] of Object.entries(reducers)) {
      this.addReducer(name, reducer);
    }
  }

  public clearQueue(): void {
    return this.queue.clear();
  }

  public createDispatcher<A extends any[] = []>(
    reducer: Reducer<G, R, A>,
    type: string = 'UNKNOWN_ACTION',
  ): Dispatcher<G, A> {
    return (...args: A): Promise<G> => {

      // Redux Dev Tools
      this.reduxDispatch({ args, type });

      return this.set(
        reducer(this.state, this.dispatchers, ...args),
      );
    };
  }

  public get dispatchers(): Dispatchers<G, R> {
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
      this.set(callback(this.state, this.dispatchers));
    }
  }

  public getDispatcher<K extends keyof R>(
    name: K,
  ): Dispatcher<G, ExtractArguments<R[K]>> {
    if (this.hasDispatcher(name)) {
      return this._dispatchers[name];
    }
    throw new Error(`Cannot return unknown ReactN reducer \`${name}\`.`);
  }

  public hasCallback(callback: Callback<G>): boolean {
    return this._callbacks.has(callback);
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

  public hasDispatcher(name: keyof R | string): boolean {
    return Object.prototype.hasOwnProperty.call(this._dispatchers, name);
  }

  public get queue(): Map<keyof G, G[keyof G]> {
    return this._queue;
  }

  public get propertyListeners(): Map<keyof G, Set<PropertyListener>> {
    return this._propertyListeners;
  }

  public reduxDispatch(action: DevToolAction<G>): boolean {
    const reduxEnhancedStore = this.reduxEnhancedStore;
    if (reduxEnhancedStore) {
      reduxEnhancedStore.dispatch(action);
      return true;
    }
    return false;
  }

  public get reduxEnhancedStore(): null | ReduxEnhancedStore<G> {
    return this._reduxEnhancedStore;
  }

  public removeCallback(callback: Callback<G>): boolean {
    return this._callbacks.delete(callback);
  }

  public removeDispatcher(name: string): boolean {
    if (this.hasDispatcher(name)) {
      delete this._dispatchers[name];
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
    this.addReducers(this._initialReducers);
    this._state = copyObject(this._initialState);
    this._reduxEnhancedStore = createReduxEnhancedStore(this);
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
    this.reduxDispatch({
      stateChange: newGlobalState,
      type: 'STATE_CHANGE',
    });

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
