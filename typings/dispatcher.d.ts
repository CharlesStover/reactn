import { State } from '../default';
import Reducer from './reducer';

export default interface Dispatcher<
  G extends {} = State,
  A extends any[] = any[],
> extends CallableFunction {
  (...args: A): Promise<G>;
}

export type ExtractArguments<R> =
  R extends Reducer<infer _G, infer _R, infer A>
    ? A
    : never;
