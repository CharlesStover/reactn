import { State } from '../default';
import GlobalStateManager from './global-state-manager';
import Reducer from './typings/reducer';



type BooleanFunction = () => boolean;



export default function addReducer<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
  name: string,
  reducer: Reducer<G>,
): BooleanFunction {
  return globalStateManager.addDispatcher(name, reducer);
};
