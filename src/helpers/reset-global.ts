import GlobalStateManager from '../global-state-manager';



export default function resetGlobal(
  globalStateManager: GlobalStateManager<any, any>,
): void {
  return globalStateManager.reset();
};
