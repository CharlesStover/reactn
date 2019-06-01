import GlobalStateManager from '../../src/global-state-manager';
import Callback from '../../types/callback';



const CALLBACK: Callback = (): void => { };



describe('GlobalStateManager.removeCallback', (): void => {

  let globalStateManager: GlobalStateManager;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager();
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removeCallback).toBeInstanceOf(Function);
    expect(globalStateManager.removeCallback).toHaveLength(1);
  });

  it('remove a callback', (): void => {
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(true);
    globalStateManager.removeCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(false);
  });



  describe('return value', (): void => {

    it('should be true if the callback existed', (): void => {
      globalStateManager.addCallback(CALLBACK);
      const removed: boolean = globalStateManager.removeCallback(CALLBACK);
      expect(removed).toBe(true);
    });

    it('should be false if the callback did not exist', (): void => {
      const removed: boolean = globalStateManager.removeCallback(CALLBACK);
      expect(removed).toBe(false);
    });
  });

});
