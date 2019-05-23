import { State } from '../default';
import Callback from '../typings/callback';
import GlobalStateManager from './global-state-manager';



export default function removeCallback<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  callback: Callback<G>,
): boolean {
  return globalStateManager.removeCallback(callback);
};
