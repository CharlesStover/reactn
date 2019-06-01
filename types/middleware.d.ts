import { Reducers, State } from '../default';
import Dispatchers from './dispatchers';

// Also defined in src/index.ts
type Middleware<
  G extends {} = State,
  R extends {} = Reducers,
> = (state: G, dispatch: Dispatchers<G, R>) => G;

export type MiddlewareCreator<
  G extends {} = State,
  R extends {} = Reducers,
> = (state: G, dispatch: Dispatchers<G, R>) => Middleware<G, R>;

export default Middleware;
