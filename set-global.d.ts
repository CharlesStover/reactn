import GlobalStateManager, { NewGlobalState } from './global-state-manager';
declare type VoidFunction<GS> = (globalState: GS) => void;
export default function setGlobal<GS>(globalStateManager: GlobalStateManager<GS>, newGlobalState: NewGlobalState<GS>, callback?: VoidFunction<GS>): Promise<GS>;
export {};
