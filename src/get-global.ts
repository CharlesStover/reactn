import GlobalStateManager from './global-state-manager';



export default function getGlobal<GS extends {} = {}>(
  globalStateManager: GlobalStateManager<GS>,
): GS {
  return globalStateManager.state;
};
