import { State } from '../default';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';



export default function setGlobal<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  newGlobalState: NewGlobalState<G>,
  callback: Callback<G> = null,
): Promise<G> {
  if (callback === null) {
    return globalStateManager.set(newGlobalState);
  }
  let globalState: G;
  return globalStateManager.set(newGlobalState)
    .then((global: G) => {
      globalState = global;
      return global;
    })
    .then((newGlobal: G) => {
      callback(newGlobal, globalStateManager.dispatchers);
    })
    .then((): G => globalState);
};
