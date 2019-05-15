import { Reducers, State } from '../default';
import { Dispatchers } from './typings/reducer';
import GlobalStateManager from './global-state-manager';



export default function getDispatch<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
): Dispatchers<G, R> {
  return globalStateManager.dispatchers;
};
