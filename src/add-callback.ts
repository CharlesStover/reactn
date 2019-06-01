import { State } from '../default';
import Callback from '../types/callback';
import GlobalStateManager from './global-state-manager';



type BooleanFunction = () => boolean;



export default function _addCallback<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  callback: Callback<G>,
): BooleanFunction {
  return globalStateManager.addCallback(callback);
};
