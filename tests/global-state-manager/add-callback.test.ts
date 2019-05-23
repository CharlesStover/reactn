import GlobalStateManager from '../../src/global-state-manager';
import Callback from '../../typings/callback';



const CALLBACK: Callback<{}> = (): void => { };



describe('GlobalStateManager.addCallback', (): void => {

  let globalStateManager: GlobalStateManager<{}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}>({});
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.addCallback).toBeInstanceOf(Function);
    expect(globalStateManager.addCallback).toHaveLength(1);
  });

  it('should add a callback', (): void => {
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(false);
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(true);
  });



  describe('return value', (): void => {

    let removeCallback: () => boolean;
    beforeEach((): void => {
      removeCallback = globalStateManager.addCallback(CALLBACK);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).toBeInstanceOf(Function);
      expect(removeCallback).toHaveLength(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasCallback(CALLBACK)).toBe(true);
      removeCallback();
      expect(globalStateManager.hasCallback(CALLBACK)).toBe(false);
    });
  });

});
