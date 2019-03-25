import { expect } from 'chai';
import GlobalStateManager from '../global-state-manager';
import spyOn from '../utils/test/spy-on-global-state-manager';
import addReducer from './add-reducer';



const REDUCER = (_globalState, _one, _two, _three): void => { };

const REDUCER_NAME = 'reducerName';



describe('addReducer', (): void => {



  let globalStateManager: GlobalStateManager<{}, {}>;
  const spy = spyOn('addDispatcher', 'removeDispatcher');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  it('should be a function', (): void => {
    expect(addReducer).to.be.a('function');
  });

  it('should accept 3 parameters', (): void => {
    expect(addReducer.length).to.equal(3);
  });

  it('should call GlobalStateManager.addDispatcher', (): void => {
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(spy.addDispatcher.calledOnceWithExactly(REDUCER_NAME, REDUCER))
      .to.equal(true);
  });



  describe('returned remove reducer function', (): void => {

    let removeReducer: () => boolean;
    beforeEach((): void => {
      removeReducer = addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    });

    it('should be a function', (): void => {
      expect(removeReducer).to.be.a('function');
    });

    it('should not accept parameters', (): void => {
      expect(removeReducer.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeDispatcher', (): void => {
      removeReducer();
      expect(spy.removeDispatcher.calledOnceWithExactly(REDUCER_NAME))
        .to.equal(true);
    });
  });

});
