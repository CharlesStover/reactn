import { Reducers, State } from '../default';
import Callback from '../types/callback';
import DispatchFunction from '../types/dispatch-function';
import Dispatcher, { ExtractArguments } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import Middleware, { MiddlewareCreator } from '../types/middleware';
import NewGlobalState, {
  FunctionalNewGlobalState,
} from '../types/new-global-state';
import Reducer, { AdditionalReducers } from '../types/reducer';
import objectGetListener from './utils/object-get-listener';



type BooleanFunction = () => boolean;

export type PropertyListener = () => void;



const copyObject = <Shape>(obj: Shape): Shape =>
  Object.assign(
    Object.create(null),
    obj,
  );

export const INVALID_NEW_GLOBAL_STATE: Error = new Error(
  'ReactN global state must be a function, null, object, or Promise.',
);



export default class GlobalStateManager<
  G extends {} = State,
  R extends {} = Reducers,
> {

  private _callbacks: Set<Callback<G>> = new Set<Callback<G>>();
  private _dispatchers: Dispatchers<G, R> =
    Object.create(null);
  private _initialReducers: R;
  private _initialState: G;
  private _middlewares: Set<Middleware<G, R>> = new Set<Middleware<G, R>>();
  private _propertyListeners: Map<keyof G, Set<PropertyListener>> =
    new Map<keyof G, Set<PropertyListener>>();
  private _queue: Map<keyof G, G[keyof G]> =
    new Map<keyof G, G[keyof G]>();
  private _state: G;

  public constructor(
    initialState: G = Object.create(null),
    initialReducers: R = Object.create(null),
  ) {
    this._initialReducers = copyObject(initialReducers);
    this._initialState = copyObject(initialState);
    this._state = copyObject(initialState);
    this.addReducers(initialReducers);
  }

  public addCallback(callback: Callback<G>): BooleanFunction {
    this._callbacks.add(callback);
    return (): boolean =>
      this.removeCallback(callback);
  }

  public addMiddleware(
    createMiddleware: MiddlewareCreator<G, R>,
  ): BooleanFunction {
    const middleware: Middleware<G, R> =
      createMiddleware(
        this.state,
        this.dispatchers,
      );
    this._middlewares.add(middleware);
    return (): boolean =>
      this.removeMiddleware(middleware);
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
    // @ts-ignore: Type 'string' cannot be used to index type
    //   'Dispatchers<G, R>'.
    this._dispatchers[name] = this.createDispatcher(reducer, name);
    return (): boolean =>
      this.removeDispatcher(name);
  }

  public addReducers(reducers: AdditionalReducers<G, R & any>): void {
    for (const [ name, reducer ] of Object.entries(reducers)) {
      this.addReducer(name, reducer);
    }
  }

  /*
  public applyMiddleware(
    global: NewGlobalState<G>,
    reducer?: string,
    reducerArgs?: any[],
  ): NewGlobalState<G> {
    let newGlobalState: NewGlobalState<G> = global;
    for (const middleware of this._middlewares) {
      newGlobalState = middleware(newGlobalState, this.dispatchers);
    }
    return newGlobalState;
  }
  */

  public clearQueue(): void {
    return this.queue.clear();
  }

  public createDispatcher<A extends any[] = []>(
    reducer: Reducer<G, R, A>,
    name: string = reducer.name,
  ): Dispatcher<G, A> {
    return (...args: A): Promise<G> => {
      return this.set(
        reducer(this.state, this.dispatcherMap, ...args),
        name, 
        args,
      )
        .then((): G => this.state);
    };
  }

  // The dispatcher map, contrary to this.dispatchers, is the map that belongs
  //   *to* a dispatcher. In addition to the map *of* dispatchers, it includes
  //   a dispatch function that sets the global state.
  public get dispatcherMap(): DispatchFunction<G> & Dispatchers<G, R> {
    const dispatch: DispatchFunction<G> = (newGlobalState: NewGlobalState<G>): Promise<G> =>
      this.set(newGlobalState).then((): G => this.state);
    return Object.assign(dispatch, this.dispatchers);
  }

  // The dispatchers are a map *of* dispatchers. This is in contrast to
  //   this.dispatcherMap, which is a map that belongs *to* a dispatcher.
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
  public flush(reducerName?: string, reducerArgs?: any[]): Partial<G> {
    const propertyListeners = new Set<PropertyListener>();

    // Covnert the state change map to an object.
    const stateChange: Partial<G> = Object.create(null);
    this.queue.forEach(
      <K extends keyof G>(value: G[K], key: K) => {
        stateChange[key] = value;
      }
    );

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
      this.set(callback(
        this.state,
        this.dispatchers,
        stateChange,
        reducerName,
        reducerArgs,
      ));
    }

    return stateChange;
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

  public hasMiddleware(middleware: Middleware<G, R>): boolean {
    return this._middlewares.has(middleware);
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

  public removeMiddleware(
    middleware: Middleware<G, R>,
  ): boolean {
    return this._middlewares.delete(middleware);
  }

  // Unmap a component instance from all state properties.
  public removePropertyListener(propertyListener: PropertyListener): boolean {
    let removed = false;

    // Remove this property listener from the global state.
    for (const propertyListeners of this.propertyListeners.values()) {
      if (propertyListeners.delete(propertyListener)) {
        removed = true;
      }
    }

    return removed;
  }

  // Reset the global state.
  public reset(): void {

    // Clear.
    this._callbacks.clear();
    this._dispatchers = Object.create(null);
    this._middlewares.clear();
    this._propertyListeners.clear();
    this._queue.clear();

    // Prepopulate.
    this.addReducers(this._initialReducers);
    this._state = copyObject(this._initialState);
  }

  // Set any type of state change.
  public set(
    newGlobalState: NewGlobalState<G>,
    reducerName?: string,
    reducerArgs?: any[],
  ): Promise<Partial<G>> {

    // Apply middleware.
    /*
    const newGlobalState: NewGlobalState<G> =
      this.applyMiddleware(global, reducer, reducerArgs);
    */

    // No changes, e.g. getDerivedGlobalFromProps.
    if (
      newGlobalState === null ||
      typeof newGlobalState === 'undefined'
    ) {
      return Promise.resolve(Object.create(null));
    }

    if (newGlobalState instanceof Promise) {
      return this.setPromise(newGlobalState, reducerName, reducerArgs);
    }

    if (typeof newGlobalState === 'function') {
      return this.setFunction(newGlobalState, reducerName, reducerArgs);
    }

    if (typeof newGlobalState === 'object') {
      return this.setObject(newGlobalState, reducerName, reducerArgs);
    }

    throw INVALID_NEW_GLOBAL_STATE;
  }

  public setFunction(
    f: FunctionalNewGlobalState<G>,
    reducerName?: string,
    reducerArgs?: any[],
  ): Promise<Partial<G>> {
    return this.set(
      f(this.state, reducerName, reducerArgs),
      reducerName,
      reducerArgs,
    );
  }

  // Set the state's property-value pairs via an object.
  public setObject<O extends Partial<G> = Partial<G>>(
    obj: O,
    reducerName?: string,
    reducerArgs?: any[],
  ): Promise<Partial<G>> {
    const properties: (keyof O)[] = Object.keys(obj) as (keyof O)[];
    for (const property of properties) {
      const value: O[keyof O] = obj[property] as O[keyof O];
      // keyof Partial<G> should be keyof G, but TypeScript cannot correctly
      //   infer that, so we use "as keyof G" and "as any as ..." here.
      this.enqueue(property as keyof G, value as any as G[keyof G]);
    }
    const stateChange: Partial<G> = this.flush(reducerName, reducerArgs);
    return Promise.resolve(stateChange);
  }

  // Set the state's property-value pairs via a promise.
  public setPromise(
    promise: Promise<NewGlobalState<G>>,
    reducerName?: string,
    reducerArgs?: any[],
  ): Promise<Partial<G>> {
    return promise
      .then((result: NewGlobalState<G>): Promise<Partial<G>> =>
        this.set(result, reducerName, reducerArgs),
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
