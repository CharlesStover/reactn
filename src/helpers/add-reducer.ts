import GlobalStateManager from '../global-state-manager';
import Reducer from '../typings/reducer';

type RemoveAddedReducer = () => boolean;

export default function addReducer<
  GS extends {} = {},
>(
  globalStateManager: GlobalStateManager<GS>,
  name: string,
  reducer: Reducer<GS>,
): RemoveAddedReducer {
  return globalStateManager.addDispatcher(name, reducer);
};
