import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';



type BooleanFunction = () => boolean;



export default function addCallback<GS extends {} = {}>(
  globalStateManager: GlobalStateManager<GS>,
  callback: Callback<GS>,
): BooleanFunction {
  return globalStateManager.addCallback(callback);
};
