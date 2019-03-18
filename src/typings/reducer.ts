import { NewGlobalState } from '../global-state-manager';
import ReactNPromise from '../utils/reactn-promise';

export type GlobalReducer<GS> = (...args: any[]) => ReactNPromise<GS>;

export type LocalReducer<GS> = (globalState: GS, ...args: any[]) => NewGlobalState<GS>;

export interface Reducers<GS> {
  [reducer: string]: GlobalReducer<GS>;
};

export type RemoveAddedReducer = () => boolean;
