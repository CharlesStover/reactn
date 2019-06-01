import { State } from '../default';
import Reducer from '../types/reducer';
import GlobalStateManager from './global-state-manager';



type BooleanFunction = () => boolean;



export default function _addReducer<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  name: string,
  reducer: Reducer<G>,
): BooleanFunction {
  return globalStateManager.addReducer(name, reducer);
};
