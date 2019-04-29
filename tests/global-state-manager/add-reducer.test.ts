import GlobalStateManager from '../../src/global-state-manager';



const REDUCER = (): null => null;

const REDUCER_NAME = 'mockReducer';



describe('GlobalStateManager.addReducer', (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.addReducer).toBeInstanceOf(Function);
    expect(globalStateManager.addReducer).toHaveLength(2);
  });

  it('should add a reducer', (): void => {
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(false);
    globalStateManager.addReducer(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(true);
  });



  describe('return value', (): void => {

    let removeDispatcher: () => boolean;
    beforeEach((): void => {
      removeDispatcher = globalStateManager.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeDispatcher).toBeInstanceOf(Function);
      expect(removeDispatcher).toHaveLength(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(true);
      removeDispatcher();
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(false);
    });
  });

});
