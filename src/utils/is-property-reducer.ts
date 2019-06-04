import { Reducers, State } from '../../default';
import Reducer, { PropertyReducer } from '../../types/reducer';

// Used to accurately identify the reducer as a property reducer is a property
//   is specified.
export default function isPropertyReducer<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
  P extends keyof G = keyof G,
>(
  _reducer: Reducer<G, R, A> | PropertyReducer<G, R, A, P>,
  property?: keyof G,
): _reducer is PropertyReducer<G, R, A, P> {
  return typeof property !== 'undefined';
};
