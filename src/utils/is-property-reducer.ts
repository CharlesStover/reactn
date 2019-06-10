import { Reducers, State } from '../../default';
import Reducer, { PropertyReducer } from '../../types/reducer';

// Used to accurately identify the reducer as a property reducer is a property
//   is specified.
export default function isPropertyReducer<
  G extends {} = State,
  R extends {} = Reducers,
  P extends keyof G = keyof G,
  A extends any[] = any[],
>(
  _reducer: Reducer<G, R, A> | PropertyReducer<G, P, A>,
  property?: keyof G,
): _reducer is PropertyReducer<G, P, A> {
  return typeof property !== 'undefined';
};
