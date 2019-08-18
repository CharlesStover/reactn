import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';

const STATE_CHANGE: Partial<G> = {
  x: true,
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};

describe('GlobalStateManager.dispatcherMap', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.dispatcherMap).toBeInstanceOf(Function);
    expect(globalStateManager.dispatcherMap).toHaveLength(1);
  });

  it('should update and return the global state', async (): Promise<void> => {
    expect(globalStateManager.state).not.toEqual(NEW_STATE);
    const newGlobalState: G = await globalStateManager.dispatcherMap(STATE_CHANGE);
    expect(newGlobalState).toEqual(NEW_STATE);
    expect(globalStateManager.state).toEqual(NEW_STATE);
  });

  it('should have a property for each reducer', (): void => {
    for (const reducer of Object.keys(INITIAL_REDUCERS)) {
      expect(globalStateManager.dispatcherMap).toHaveProperty(reducer);
      expect(globalStateManager.dispatcherMap[reducer]).toBeInstanceOf(Function);
    }
  });
});
