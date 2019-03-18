import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import Callback from '../typings/callback';
import ReactNPromise from '../utils/reactn-promise';

export default function setGlobal<GS>(
  globalStateManager: GlobalStateManager<GS>,
  newGlobal: NewGlobalState<GS>,
  callback: Callback<GS> = null
): ReactNPromise<GS> {
  if (callback) {
    return globalStateManager.set(newGlobal)
      .then(callback);
  }
  return globalStateManager.set(newGlobal);
};
