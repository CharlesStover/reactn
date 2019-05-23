import { State } from '../default';
import Callback from '../typings/callback';
import GlobalStateManager from './global-state-manager';



type BooleanFunction = () => boolean;



export default function addCallback<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  callback: Callback<G>,
): BooleanFunction {
  return globalStateManager.addCallback(callback);
};
