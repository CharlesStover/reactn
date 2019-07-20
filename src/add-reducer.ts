import { State, Reducers } from '../default';
import Reducer, { AdditionalReducers } from '../types/reducer';
import GlobalStateManager from './global-state-manager';



type BooleanFunction = () => boolean;



export default function _addReducer<
  G extends {} = State,
  R extends {} = Reducers,
  ReducerName extends keyof R = keyof R,
>(
  globalStateManager: GlobalStateManager<G, R>,
  name: ReducerName,
  reducer: R[ReducerName],
);
export default function _addReducer<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
  name: string,
  reducer: Reducer<G, R & AdditionalReducers<G, R>>,
);
export default function _addReducer<
  G extends {} = State,
  R extends {} = Reducers,
  ReducerName extends keyof R = keyof R,
>(
  globalStateManager: GlobalStateManager<G, R>,
  name: ReducerName | string,
  reducer: R[ReducerName] | Reducer<G, R & AdditionalReducers<G, R>>,
): BooleanFunction {
  return globalStateManager.addReducer(
    name as string,
    reducer as Reducer<G, R>,
  );
};
