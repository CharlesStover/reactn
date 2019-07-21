import { Reducers, State } from '../../default';
import Context from '../context';
import defaultGlobalStateManager from '../default-global-state-manager';
import GlobalStateManager from '../global-state-manager';

export default function getGlobalStateManager<
  G extends {} = State,
  R extends {} = Reducers,
>(): GlobalStateManager<G, R> {
  return (
    Context &&
    (
      (Context._currentValue2 as GlobalStateManager<G, R>) ||
      (Context._currentValue as GlobalStateManager<G, R>)
    )
  ) ||
  (defaultGlobalStateManager as GlobalStateManager<G, R>);
}
