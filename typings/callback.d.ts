import { Reducers, State } from '../default';
import Dispatchers from './dispatchers';
import NewGlobalState from './new-global-state';

type Callback<G extends {} = State, R extends {} = Reducers> = (
  globalState: G,
  dispatch: Dispatchers<G, R>,
  stateChange: Partial<G>,
  reducerName?: string,
  reducerArgs?: any[],
) => NewGlobalState<G>;

export default Callback;
