import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';



export default function removeCallback<GS extends {} = {}>(
  globalStateManager: GlobalStateManager<GS>,
  callback: Callback<GS>,
): boolean {
  return globalStateManager.removeCallback(callback);
};
