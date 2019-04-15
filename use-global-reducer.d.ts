import { Reducers, State } from '../default';
import GlobalStateManager from './global-state-manager';
import Reducer, { Dispatcher, ExtractA } from './typings/reducer';
export declare type UseGlobalReducer<G extends {} = State, R extends {} = Reducers, K extends keyof R = keyof R, A extends any[] = any[]> = Dispatcher<G, A> | Dispatcher<G, ExtractA<R[K]>>;
export default function useGlobalReducer<G extends {} = State, A extends any[] = any[]>(overrideGlobalStateManager: GlobalStateManager<G, any> | null, reducer: Reducer<G, A>): Dispatcher<G, A>;
export default function useGlobalReducer<G extends {} = State, R extends {} = Reducers, K extends keyof R = keyof R>(overrideGlobalStateManager: GlobalStateManager<G, R> | null, reducer: K): Dispatcher<G, ExtractA<R[K]>>;
