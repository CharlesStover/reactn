import { State } from '../default';
import GlobalStateManager from './global-state-manager';



export default function _getGlobal<G extends {} = State>(
  globalStateManager: GlobalStateManager<G>,
): G {
  return globalStateManager.state;
};
