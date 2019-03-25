import Callback from './typings/callback';
import Reducer, {
  Dispatcher,
  Dispatchers,
} from './typings/reducer';
import objectGetListener from './utils/object-get-listener';
import Transaction from './utils/transaction';



// Additional Reducers cannot maintain their argument types, as they don't
//   exist until runtime.
interface AdditionalDispatchers<GS> {
  [name: string]: Dispatcher<Reducer<GS, any>>;
}
interface AdditionalReducers<GS> {
  [name: string]: Reducer<GS, any>;
}

// AsynchronousNewGlobalState is an interface so that NewGlobalState does not
//   circularly reference itself.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsynchronousNewGlobalState<Shape>
  extends Promise<NewGlobalState<Shape>> { }

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

type RemoveAddedCallback = () => boolean;

type RemoveAddedReducer = () => boolean;

type SynchronousNewGlobalState<Shape> = null | Partial<Shape> | void;



const copyObject = <Shape>(obj: Shape): Shape =>
  Object.assign(
    Object.create(null),
    obj,
  );

const INVALID_NEW_GLOBAL_STATE: Error = new Error(
  'ReactN global state must be a function, null, object, or Promise.',
);

const MAX_SAFE_INTEGER = 9007199254740990;

const MISSING_TRANSACTION = new Error(
  'ReactN transaction missing during transaction process.',
);



export default class GlobalStateManager<
  GS extends {} = {},
  R extends {} = {},
> {

  private _callbacks: Set<Callback<GS>> = new Set<Callback<GS>>();
  private _initialReducers: R;
  private _initialState: GS;
  private _propertyListeners: Map<keyof GS, Set<PropertyListener>> =
    new Map<keyof GS, Set<PropertyListener>>();

  // @ts-ignore: Property '_reducers' has no initializer and is not
  //   definitely assigned in the constructor.
  private _reducers: R & AdditionalReducers<GS>;

  // @ts-ignore: Property '_state' has no initializer and is not definitely
  //   assigned in the constructor.
  private _state: GS;

  // @ts-ignore: Property '_transactionId' has no initializer and is not
  //   definitely assigned in the constructor.
  private _transactionId: number;
  private _transactions: Map<number, Transaction<GS>> =
    new Map<number, Transaction<GS>>();



  public constructor(
    initialState: GS = Object.create(null),
    initialReducers: R = Object.create(null),
  ) {
    this._initialReducers = copyObject(initialReducers);
    this._initialState = copyObject(initialState);
    this.reset();
  }



  public addCallback(callback: Callback<GS>): RemoveAddedCallback {
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

  public addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<GS, A>,
  ): RemoveAddedReducer {
    this._reducers[name] = reducer;
    return (): boolean =>
      this.removeReducer(name);
  }

  // Begin a transaction.
  public beginTransaction(): number {
    this._transactionId = (this._transactionId + 1) % MAX_SAFE_INTEGER;
    this._transactions.set(this._transactionId, new Transaction());
    return this._transactionId;
  }

  // Commit a transaction.
  public commit(transactionId: number): void {

    if (!this.hasTransaction(transactionId)) {
      throw MISSING_TRANSACTION;
    }

    const transaction: Transaction<GS> = this._transactions.get(transactionId);

    // Delete state properties.
    for (const property of transaction.voidProperties) {
      delete this._state[property];
    }

    // Commit all state changes.
    for (const [ property, value ] of transaction.properties.entries()) {
      this._state[property] = value;
    }

    // Force update all components that were a part of this transaction.
    for (const propertyListener of transaction.propertyListeners) {
      propertyListener();
    }

    // Clean up this transaction.
    this._transactions.delete(transactionId);

    // Call each global callback.
    for (const callback of this._callbacks) {

      // Delay these until after the current transaction has deleted?
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
    return Object.entries(this.reducers).reduce(
      (dispatchers, [ reducerName, reducer]) => {
        dispatchers[reducerName] = this.createDispatcher(reducer);
        return dispatchers;
      },
      Object.create(null),
    );
  }

  public getReducer(name: string): null | Reducer<GS> {
    return this._reducers[name] || null;
  }

  // Determine whether the global state manager has a callback.
  // Used in unit testing to track callback addition and removal.
  public hasCallback(callback: Callback<GS>): boolean {
    return this._callbacks.has(callback);
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

  public hasReducer(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._reducers, name);
  }

  public hasTransaction(id: number): boolean {
    return this._transactions.has(id);
  }

  get propertyListeners(): Map<keyof GS, Set<PropertyListener>> {
    return this._propertyListeners;
  }

  public get reducers(): R & AdditionalReducers<GS> {
    return copyObject(this._reducers);
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

    // Remove this property listener from currently-executing transactions.
    for (const transaction of this._transactions.values()) {
      transaction.deletePropertyListener(propertyListener);
    }

    return removed;
  }

  public removeReducer(reducer: string): boolean {
    if (this.hasReducer(reducer)) {
      delete this._reducers[reducer];
      return true;
    }
    return false;
  }

  // Reset the global state.
  public reset(): void {
    this._callbacks.clear();
    this._propertyListeners.clear();
    this._reducers = copyObject(this._initialReducers);
    this._state = copyObject(this._initialState);
    this._transactionId = 0;
    this._transactions.clear();
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
    const transactionId = this.beginTransaction();
    const properties: (keyof GS)[] = Object.keys(obj) as (keyof GS)[];
    for (const property of properties) {
      const value: GS[keyof GS] = obj[property] as GS[keyof GS];
      this.setProperty(property, value, transactionId);
    }
    this.commit(transactionId);
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

  // Set a property-value pair as a part of a transaction.
  public setProperty<Property extends keyof GS>(
    property: Property,
    value: GS[Property],
    transactionId: number,
  ): number {

    if (!this.hasTransaction(transactionId)) {
      throw MISSING_TRANSACTION;
    }

    const transaction: Transaction<GS> = this._transactions.get(transactionId);

    if (typeof value === 'undefined') {
      transaction.deleteProperty(property);
    }
    else {
      transaction.setProperty(property, value);
    }

    if (this.propertyListeners.has(property)) {
      for (const propertyListener of this.propertyListeners.get(property)) {
        transaction.addPropertyListener(propertyListener);
      }
    }

    return transactionId;
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
