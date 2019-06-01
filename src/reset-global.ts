import GlobalStateManager from './global-state-manager';



export default function _resetGlobal(
  globalStateManager: GlobalStateManager<any, any>,
): void {
  return globalStateManager.reset();
};
