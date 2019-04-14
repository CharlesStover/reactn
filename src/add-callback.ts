import { State } from '../default';
import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';



type BooleanFunction = () => boolean;



export default function addCallback<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  callback: Callback<G>,
): BooleanFunction {
  return globalStateManager.addCallback(callback);
};
