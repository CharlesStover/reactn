import addReducer from '../src/add-reducer';
import GlobalStateManager from '../src/global-state-manager';
import spyOn from './utils/spy-on-global-state-manager';



const REDUCER = (_globalState, _dispatch, _one, _two, _three): void => { };

const REDUCER_NAME = 'reducerName';



describe('addReducer', (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  const spy = spyOn('addReducer', 'removeDispatcher');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  it('should be a function with 3 arguments', (): void => {
    expect(addReducer).toBeInstanceOf(Function);
    expect(addReducer).toHaveLength(3);
  });

  it('should call GlobalStateManager.addReducer', (): void => {
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(spy.addReducer).toHaveBeenCalledTimes(1);
    expect(spy.addReducer).toHaveBeenCalledWith(REDUCER_NAME, REDUCER);
  });



  describe('returned remove reducer function', (): void => {

    let removeReducer: () => boolean;
    beforeEach((): void => {
      removeReducer = addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeReducer).toBeInstanceOf(Function);
      expect(removeReducer).toHaveLength(0);
    });

    it('should call GlobalStateManager.removeDispatcher', (): void => {
      removeReducer();
      expect(spy.removeDispatcher).toHaveBeenCalledTimes(1);
      expect(spy.removeDispatcher).toHaveBeenCalledWith(REDUCER_NAME);
    });
  });

});
