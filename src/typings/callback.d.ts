import { State } from '../../default';
import { NewGlobalState } from '../global-state-manager';
import { ReducerMap } from './reducer';

type Callback<G extends {} = State> = (
  globalState: G,
  reducers: ReducerMap<G>,
) => NewGlobalState<G>;

export default Callback;
