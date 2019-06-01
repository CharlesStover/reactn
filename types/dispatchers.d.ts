import { Reducers, State } from '../default';
import Dispatcher, { ExtractArguments } from './dispatcher';

// Additional Dispatchers cannot maintain their argument types, as they don't
//   exist until runtime.
export interface AdditionalDispatchers<G extends {} = State> {
  [name: string]: Dispatcher<G, any>;
}

export type DispatcherMap<G extends {} = State, R extends {} = Reducers> = {
  [name in keyof R]: Dispatcher<G, ExtractArguments<R[name]>>;
};

type Dispatchers<
  G extends {} = State,
  R extends {} = Reducers,
> = DispatcherMap<G, R> & AdditionalDispatchers<G>;

export default Dispatchers;
