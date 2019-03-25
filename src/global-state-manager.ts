import Callback from './typings/callback';
import Reducer, {
  AdditionalDispatchers,
  Dispatcher,
  Dispatchers,
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

/*
interface GlobalStateManagerClass {
  new <GS, R>(initialGlobalState: GS, initialReducers: R): GlobalStateManager<GS, R>;
  new <GS>(initialGlobalState: GS): GlobalStateManager<GS, {}>;
  new (): GlobalStateManager<{}, {}>;
}
*/

export type NewGlobalState<Shape> =
  AsynchronousNewGlobalState<Shape> |
  FunctionalNewGlobalState<Shape> |
  SynchronousNewGlobalState<Shape>;

// type PartialState<Shape> = Shape extends {} ? Partial<Shape> : Shape;

export type PropertyListener = () => void;

type SynchronousNewGlobalState<Shape> = null | Partial<Shape> | void;



const copyObject = <Shape>(obj: Shape): Shape =>
  Object.assign(
    Object.create(null),
    obj,
  );

const INVALID_NEW_GLOBAL_STATE: Error = new Error(
  'ReactN global state must be a function, null, object, or Promise.',
);



export default class GlobalStateManager<
  GS extends {} = {},
  R extends {} = {},
> {

  private _callbacks: Set<Callback<GS>> = new Set<Callback<GS>>();

  // @ts-ignore: Property '_dispatchers' has no initializer and is not
  //   definitely assigned in the constructor.
  private _dispatchers: Dispatchers<GS, R> & AdditionalDispatchers<GS>;
  private _initialReducers: R;
  private _initialState: GS;
  private _propertyListeners: Map<keyof GS, Set<PropertyListener>> =
    new Map<keyof GS, Set<PropertyListener>>();
  private _queue: Map<keyof GS, GS[keyof GS]> =
    new Map<keyof GS, GS[keyof GS]>();

  // @ts-ignore: Property '_state' has no initializer and is not definitely
  //   assigned in the constructor.
  private _state: GS;



  public constructor(
    initialState: GS = Object.create(null),
    initialReducers: R = Object.create(null),
  ) {
    this._initialReducers = copyObject(initialReducers);
    this._initialState = copyObject(initialState);
    this.reset();
  }



  public addCallback(callback: Callback<GS>): BooleanFunction {
    this._callbacks.add(callback);
    return (): boolean =>
      this.removeCallback(callback);
  }

  // Map component instance to a state property.
  public addPropertyListener(
    property: keyof GS,
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
    reducer: Reducer<GS, A>,
  ): BooleanFunction {
    this._dispatchers[name] = this.createDispatcher(reducer);
    return (): boolean =>
      this.removeDispatcher(name);
  }

  public addDispatchers(reducers: AdditionalReducers<GS>): void {
    for (const [ name, reducer ] of Object.entries(reducers)) {
      this.addDispatcher(name, reducer);
    }
  }

  public clearQueue(): void {
    return this.queue.clear();
  }

  public enqueue<Property extends keyof GS>(
    property: Property,
    value: GS[Property],
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

  public createDispatcher<A extends any[] = []>(
    reducer: Reducer<GS, A>,
  ): Dispatcher<Reducer<GS, A>> {
    return (...args: A): Promise<GS> =>
      this.set(
        reducer(this.state, ...args),
      );
  }

  public get dispatchers(): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
    return copyObject(this._dispatchers);
  }

  // Determine whether the global state manager has a callback.
  // Used in unit testing to track callback addition and removal.
  public hasCallback(callback: Callback<GS>): boolean {
    return this._callbacks.has(callback);
  }

  public hasDispatcher(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._dispatchers, name);
  }

  // Determine whether the global state manager has a property listener.
  // Used in unit testing to track property listener addition and removal.
  hasPropertyListener(pl: PropertyListener): boolean {
    for (const propertyListeners of this.propertyListeners.values()) {
      for (const propertyListener of propertyListeners) {
        if (propertyListener === pl) {
          return true;
        }
      }
    }
    return false;
  }

  public get queue(): Map<keyof GS, GS[keyof GS]> {
    return this._queue;
  }

  get propertyListeners(): Map<keyof GS, Set<PropertyListener>> {
    return this._propertyListeners;
  }

  public removeCallback(callback: Callback<GS>): boolean {
    return this._callbacks.delete(callback);
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

  public removeDispatcher(dispatcherName: string): boolean {
    if (this.hasDispatcher(dispatcherName)) {
      delete this._dispatchers[dispatcherName];
      return true;
    }
    return false;
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
  public set(newGlobalState: NewGlobalState<GS>): Promise<GS> {

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

    if (typeof newGlobalState === 'object') {
      return this.setObject(newGlobalState);
    }

    throw INVALID_NEW_GLOBAL_STATE;
  }

  public setFunction(f: FunctionalNewGlobalState<GS>): Promise<GS> {
    return this.set(f(this.state));
  }

  // Set the state's property-value pairs via an object.
  public setObject<O extends Partial<GS> = Partial<GS>>(obj: O): Promise<GS> {
    const properties: (keyof GS)[] = Object.keys(obj) as (keyof GS)[];
    for (const property of properties) {
      const value: GS[keyof GS] = obj[property] as GS[keyof GS];
      this.enqueue(property, value);
    }
    this.flush();
    return Promise.resolve(this.state);
  }

  // Set the state's property-value pairs via a promise.
  public setPromise(
    promise: Promise<NewGlobalState<GS>>
  ): Promise<GS> {
    return promise
      .then((result: NewGlobalState<GS>) => {
        return this.set(result);
      });
  }

  public spyState(propertyListener: PropertyListener): GS {

    // When this._state is read, execute the listener.
    return objectGetListener(
      this._state,
      (property: keyof GS) => {
        this.addPropertyListener(property, propertyListener);
      }
    );
  }

  public get state(): Readonly<GS> {
    return copyObject(this._state);
  }
};
