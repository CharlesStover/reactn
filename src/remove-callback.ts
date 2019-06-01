import { State } from '../default';
import Callback from '../types/callback';
import GlobalStateManager from './global-state-manager';



export default function _removeCallback<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  callback: Callback<G>,
): boolean {
  return globalStateManager.removeCallback(callback);
};
