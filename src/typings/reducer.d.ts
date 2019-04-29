import { Reducers, State } from '../../default';
import { NewGlobalState } from '../global-state-manager';

// Additional Reducers cannot maintain their argument types, as they don't
//   exist until runtime.
export interface AdditionalDispatchers<G extends {} = State> {
  [name: string]: Dispatcher<G, any>;
}

export type Dispatchers<
  G extends {} = State,
  R extends {} = Reducers,
> = DispatcherMap<G, R> & AdditionalDispatchers<G>;

export interface Dispatcher<
  G extends {} = State,
  A extends any[] = any[],
> extends CallableFunction {
  (...args: A): Promise<G>;
}

export type DispatcherMap<G extends {} = State, R extends {} = Reducers> = {
  [name in keyof R]: Dispatcher<G, ExtractA<R[name]>>;
};

export type ExtractA<R> =
  R extends Reducer<infer _G, infer _R, infer A>
    ? A
    : never;

export default interface Reducer<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
> extends CallableFunction {
  (global: G, dispatch: Dispatchers<G, R>, ...args: A): NewGlobalState<G>;
}

export interface ReducerMap<G extends {} = State, R extends {} = Reducers> {
  [name: string]: Reducer<G, R>;
}
