import { NewGlobalState } from './src/global-state-manager';
import { Dispatchers } from './src/typings/reducer';

export type Dispatch = Dispatchers<State, Reducers>;

export interface Reducers { }

export interface State { }
