import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('GlobalStateManager.constructor', (): void => {

  it('should initialize with an empty state object', (): void => {
    const globalStateManager: GlobalStateManager = new GlobalStateManager();
    expect(globalStateManager.state).toEqual({});
  });

  it('should initialize with an empty dispatchers object', (): void => {
    const globalStateManager: GlobalStateManager = new GlobalStateManager();
    expect(globalStateManager.dispatchers).toEqual({});
  });

  it('should support an initial state', (): void => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS>(INITIAL_STATE);
    expect(globalStateManager.state).toEqual(INITIAL_STATE);
  });

  it('should support initial dispatchers', (): void => {
    const globalStateManager: GlobalStateManager<GS, R> =
      new GlobalStateManager<GS, R>(INITIAL_STATE, INITIAL_REDUCERS);
    expect(Object.keys(globalStateManager.dispatchers))
      .toEqual(Object.keys(INITIAL_REDUCERS));
  });
});
