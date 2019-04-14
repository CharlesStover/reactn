import { State } from '../../default';
import { NewGlobalState } from '../global-state-manager';

// Additional Reducers cannot maintain their argument types, as they don't
//   exist until runtime.
export interface AdditionalDispatchers<GS> {
  [name: string]: Dispatcher<GS, any>;
}

export interface Dispatcher<
  G extends {} = State,
  A extends any[] = any[],
> extends CallableFunction {
  (...args: A): Promise<G>;
}

export type DispatcherMap<G, R extends ReducerMap<G>> = {
  [name in keyof R]: Dispatcher<G, ExtractA<R[name]>>;
};

export type ExtractA<R> = R extends Reducer<infer _G, infer A> ? A : never;

export default interface Reducer<
  G extends {} = State,
  A extends any[] = any[],
> extends CallableFunction {
  (globalState: G, ...args: A): NewGlobalState<G>;
}

export interface ReducerMap<G extends {} = State> {
  [name: string]: Reducer<G>;
}
