import Callback from './callback';
import NewGlobalState from './new-global-state';

export type GlobalTuple<GS> = [
  GS,
  (newGlobalState: NewGlobalState<GS>, callback?: Callback<GS>) => Promise<GS>,
];

export type Setter<G extends {}, P extends keyof G> =
  (newValue: G[P], callback?: Callback<G>) => Promise<G>;

export type StateTuple<G extends {}, P extends keyof G> = [
  G[P],
  Setter<G, P>,
];

type UseGlobal<G extends {}, Property extends keyof G> =
  GlobalTuple<G> | StateTuple<G, Property>;

export default UseGlobal;
