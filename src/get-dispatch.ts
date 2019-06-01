import { Reducers, State } from '../default';
import Dispatchers from '../types/dispatchers';
import GlobalStateManager from './global-state-manager';



export default function _getDispatch<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
): Dispatchers<G, R> {
  return globalStateManager.dispatchers;
};
