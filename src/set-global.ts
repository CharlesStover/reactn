import GlobalStateManager, { NewGlobalState } from './global-state-manager';



type VoidFunction<GS> = (globalState: GS) => void;



export default function setGlobal<GS>(
  globalStateManager: GlobalStateManager<GS>,
  newGlobalState: NewGlobalState<GS>,
  callback: VoidFunction<GS> = null,
): Promise<GS> {
  if (callback === null) {
    return globalStateManager.set(newGlobalState);
  }
  let globalState: GS;
  return globalStateManager.set(newGlobalState)
    .then(gs => {
      globalState = gs;
      return gs;
    })
    .then(callback)
    .then(() => globalState);
};
