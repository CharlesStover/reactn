import { Reducers, State } from '../default';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';



export default function setGlobal<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
  newGlobalState: NewGlobalState<G>,
  callback: Callback<G, R> = null,
): Promise<G> {
  if (callback === null) {
    return globalStateManager.set(newGlobalState);
  }
  return globalStateManager.set(newGlobalState)
    .then(async (global: G): Promise<G> => {
      await setGlobal(
        globalStateManager,
        callback(global, globalStateManager.dispatchers),
      );
      return global;
    });
};
