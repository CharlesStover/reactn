import GlobalStateManager from '../global-state-manager';
import { LocalReducer } from '../typings/reducer';

type RemoveAddedReducer = () => boolean;

export default function addReducer<GS>(
  globalStateManager: GlobalStateManager<GS>,
  name: string,
  reducer: LocalReducer<GS>,
): RemoveAddedReducer {
  return globalStateManager.addReducer(name, reducer);
};
