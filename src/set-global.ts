import { Reducers, State } from '../default';
import Callback from '../typings/callback';
import NewGlobalState from '../typings/new-global-state';
import GlobalStateManager from './global-state-manager';



export default function setGlobal<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
  newGlobalState: NewGlobalState<G>,
  callback: Callback<G, R> = null,
): Promise<G> {

  // If there is no callback, update then return the state.
  if (callback === null) {
    return globalStateManager.set(newGlobalState)
      .then((): G =>
        globalStateManager.state,
      );
  }

  // If there is a callback, update the state, update the state with the
  //   callback, then return the state.
  return globalStateManager.set(newGlobalState)
    .then((stateChange: Partial<G>): Promise<G> =>
      setGlobal(
        globalStateManager,
        callback(
          globalStateManager.state,
          globalStateManager.dispatchers,
          stateChange,
        ),
      )
    )
    .then((): G =>
      globalStateManager.state,
    );
};
