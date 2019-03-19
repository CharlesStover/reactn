import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import Callback from '../typings/callback';

export default function setGlobal<GS>(
  globalStateManager: GlobalStateManager<GS>,
  newGlobal: NewGlobalState<GS>,
  callback: Callback<GS> = null
): Promise<GS> {
  if (callback) {
    return globalStateManager.set(newGlobal)
      .then(callback);
  }
  return globalStateManager.set(newGlobal);
};
