import { NewGlobalState } from '../global-state-manager';

export type GlobalReducer<GS> = (...args: any[]) => Promise<GS>;

export type LocalReducer<GS> = (globalState: GS, ...args: any[]) => NewGlobalState<GS>;

export interface Reducers<GS> {
  [reducer: string]: GlobalReducer<GS>;
};

export type RemoveAddedReducer = () => boolean;
