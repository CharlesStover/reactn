import DispatchFunction from './types/dispatch-function';
import Dispatchers from './types/dispatchers';
import NewGlobalState from './types/new-global-state';

export interface Dispatch extends DispatchFunction<State> & Dispatchers<State, Reducers> { }

export interface Reducers { }

export interface State { }
