import { NewGlobalState } from '../global-state-manager';

type Callback<GS> = (globalState: GS) => NewGlobalState<GS>;

export default Callback;
