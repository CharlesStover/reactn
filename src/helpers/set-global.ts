import GlobalStateManager, { NewGlobalState } from '../global-state-manager';

type VoidFunction<GS> = (globalState: GS) => void;

export default function setGlobal<GS>(
  globalStateManager: GlobalStateManager<GS>,
  newGlobal: NewGlobalState<GS>,
  callback: VoidFunction<GS> = null
): Promise<GS> {
  if (callback === null) {
    return globalStateManager.set(newGlobal);
  }
  let globalState: GS;
  return globalStateManager.set(newGlobal)
    .then(gs => {
      globalState = gs;
      return gs;
    })
    .then(callback)
    .then(() => globalState);
};
