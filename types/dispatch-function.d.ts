import { State } from '../default';
import NewGlobalState from './new-global-state';

type DispatchFunction<G extends {} = State> = (newGlobalState: NewGlobalState<G>) => Promise<G>;

export default DispatchFunction;
