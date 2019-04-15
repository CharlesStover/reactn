import { State } from '../default';
import GlobalStateManager from './global-state-manager';
import Reducer from './typings/reducer';
declare type BooleanFunction = () => boolean;
export default function addReducer<G extends {} = State>(globalStateManager: GlobalStateManager<G>, name: string, reducer: Reducer<G>): BooleanFunction;
export {};
