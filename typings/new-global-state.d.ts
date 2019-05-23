import { State } from '../default';

// AsynchronousNewGlobalState is an interface so that NewGlobalState does not
//   circularly reference itself.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsynchronousNewGlobalState<G extends {} = State>
  extends Promise<NewGlobalState<G>> { }

export interface FunctionalNewGlobalState<G extends {} = State> {
  (global: G, reducerName?: string, reducerArgs?: any[]): NewGlobalState<G>;
}

type NewGlobalState<G extends {} = State> =
  AsynchronousNewGlobalState<G> |
  FunctionalNewGlobalState<G> |
  SynchronousNewGlobalState<G>;

export default NewGlobalState;

type SynchronousNewGlobalState<G extends {} = State> =
  null | Partial<G> | void;
