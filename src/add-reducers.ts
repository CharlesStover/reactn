import addReducer from './add-reducer';
import GlobalStateManager from './global-state-manager';
import { Reducers } from './typings/reducer';



type BooleanFunction = () => boolean;



export default function addReducers<
  GS extends {} = {},
>(
  globalStateManager: GlobalStateManager<GS>,
  reducers: Reducers<GS>,
): BooleanFunction {

  // Amalgamate all the functions to remove these reducers.
  const removeReducers: Set<BooleanFunction> = new Set<BooleanFunction>();
  for (const [ name, reducer ] of Object.entries(reducers)) {
    removeReducers.add(
      addReducer(globalStateManager, name, reducer)
    );
  }

  // Return a function that will remove these reducers.
  return (): boolean => {
    let success: boolean = true;
    for (const removeReducer of removeReducers) {
      success = success && removeReducer();
    }
    return success;
  };
};
