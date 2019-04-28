import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



const DISPATCHER_NAME: keyof R = 'increment';



describe('GlobalStateManager.removeDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removeDispatcher).toBeInstanceOf(Function);
    expect(globalStateManager.removeDispatcher).toHaveLength(1);
  });

  it('remove a dispatcher', (): void => {
    expect(globalStateManager.hasDispatcher(DISPATCHER_NAME)).toBe(true);
    globalStateManager.removeDispatcher(DISPATCHER_NAME);
    expect(globalStateManager.hasDispatcher(DISPATCHER_NAME)).toBe(false);
  });



  describe('return value', (): void => {

    it('should be true if the dispatcher existed', (): void => {
      const removed: boolean =
        globalStateManager.removeDispatcher(DISPATCHER_NAME);
      expect(removed).toBe(true);
    });

    it('should be false if the dispatcher did not exist', (): void => {
      const FAKE_DISPATCHER_NAME: string = 'mockDispatcher';
      const removed: boolean =
        globalStateManager.removeDispatcher(FAKE_DISPATCHER_NAME);
      expect(removed).toBe(false);
    });
  });

});
