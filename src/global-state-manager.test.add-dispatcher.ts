import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';



const REDUCER = () => null;

const REDUCER_NAME = 'mockReducer';



export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', () => {
    expect(globalStateManager.addDispatcher).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(globalStateManager.addDispatcher.length).to.equal(2);
  });

  it('should add a reducer', () => {
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(false);
    globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(true);
  });



  describe('return value', () => {

    let removeDispatcher: () => boolean;
    beforeEach(() => {
      removeDispatcher = globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    });

    it('should be a function', () => {
      expect(removeDispatcher).to.be.a('function');
    });

    it('should accept no parameters', () => {
      expect(removeDispatcher.length).to.equal(0);
    });

    it('should remove the callback', () => {
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(true);
      removeDispatcher();
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(false);
    });
  });
};
