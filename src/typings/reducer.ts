import { NewGlobalState } from '../global-state-manager';

// Additional Reducers cannot maintain their argument types, as they don't
//   exist until runtime.
export interface AdditionalDispatchers<GS> {
  [name: string]: Dispatcher<GS, any>;
}

export interface Dispatcher<
  GS extends {} = {},
  A extends any[] = any[],
> extends CallableFunction {
  (...args: A): Promise<GS>;
}

export type Dispatchers<GS, R extends Reducers<GS>> = {
  [name in keyof R]: Dispatcher<GS, ExtractA<R[name]>>;
};

export type ExtractA<R> = R extends Reducer<infer _GS, infer A> ? A : never;

export default interface Reducer<
  GS extends {} = {},
  A extends any[] = any[],
> extends CallableFunction {
  (globalState: GS, ...args: A): NewGlobalState<GS>;
};

export interface Reducers<GS extends {} = {}> {
  [name: string]: Reducer<GS>;
};
