import { expect } from 'chai';
import sinon from 'sinon';
import GlobalStateManager from '../global-state-manager';
import spyOn from '../utils/test/spy-on-global-state-manager';
import addReducer from './add-reducer';



const REDUCER = (_globalState, _one, _two, _three): void => { };

const REDUCER_NAME = 'reducerName';



describe('addReducer', () => {



  let globalStateManager: GlobalStateManager<{}, {}>;
  const spy = spyOn('addDispatcher', 'removeDispatcher');

  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  it('should be a function', () => {
    expect(addReducer).to.be.a('function');
  });

  it('should accept 3 parameters', () => {
    expect(addReducer.length).to.equal(3);
  });

  it('should call GlobalStateManager.addDispatcher', () => {
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(spy.addDispatcher.calledOnceWithExactly(REDUCER_NAME, REDUCER)).to.equal(true);
  });



  describe('returned remove reducer function', () => {

    let removeReducer: () => boolean;
    beforeEach(() => {
      removeReducer = addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    });

    it('should be a function', () => {
      expect(removeReducer).to.be.a('function');
    });

    it('should not accept parameters', () => {
      expect(removeReducer.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeDispatcher', () => {
      removeReducer();
      expect(spy.removeDispatcher.calledOnceWithExactly(REDUCER_NAME)).to.equal(true);
    });
  });

});
