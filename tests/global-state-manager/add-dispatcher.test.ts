import GlobalStateManager from '../../src/global-state-manager';



const REDUCER = (): null => null;

const REDUCER_NAME = 'mockReducer';



describe('GlobalStateManager.addDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.addDispatcher).toEqual(expect.any(Function));
    expect(globalStateManager.addDispatcher.length).toBe(2);
  });

  it('should add a reducer', (): void => {
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(false);
    globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(true);
  });



  describe('return value', (): void => {

    let removeDispatcher: () => boolean;
    beforeEach((): void => {
      removeDispatcher = globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeDispatcher).toEqual(expect.any(Function));
      expect(removeDispatcher.length).toBe(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(true);
      removeDispatcher();
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(false);
    });
  });

});
