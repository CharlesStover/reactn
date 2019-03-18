import { NewGlobalState } from '../global-state-manager';

export type Callback<GS> = (globalState: GS) => NewGlobalState<GS>;
