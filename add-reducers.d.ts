import { State } from '../default';
import GlobalStateManager from './global-state-manager';
import { ReducerMap } from './typings/reducer';
declare type BooleanFunction = () => boolean;
export default function addReducers<G extends {} = State>(globalStateManager: GlobalStateManager<G>, reducers: ReducerMap<G>): BooleanFunction;
export {};
