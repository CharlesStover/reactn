import { Reducers, State } from '../../default';
import { NewGlobalState } from '../global-state-manager';
import { AdditionalReducers } from './reducer';

type Callback<G extends {} = State, R extends {} = Reducers> = (
  globalState: G,
  reducers: AdditionalReducers<G, R>,
) => NewGlobalState<G>;

export default Callback;
