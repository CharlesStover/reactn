import DispatchFunction from './types/dispatch-function';
import Dispatchers from './types/dispatchers';

type DispatcherMap = DispatchFunction<State> & Dispatchers<State, Reducers>;

export interface Dispatch extends DispatcherMap { }

export interface Reducers { }

export interface State { }
