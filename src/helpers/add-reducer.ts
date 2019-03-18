import GlobalStateManager from '../global-state-manager';
import { LocalReducer } from '../typings/reducer';

export default function addReducer<GS>(
  globalStateManager: GlobalStateManager<GS>,
  name: string,
  reducer: LocalReducer<GS>,
): void {
  globalStateManager.addReducer(name, reducer);
};
