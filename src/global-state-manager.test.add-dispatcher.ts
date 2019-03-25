import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';



const REDUCER = (): null => null;

const REDUCER_NAME = 'mockReducer';



export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', (): void => {
    expect(globalStateManager.addDispatcher).to.be.a('function');
  });

  it('should accept 2 parameters', (): void => {
    expect(globalStateManager.addDispatcher.length).to.equal(2);
  });

  it('should add a reducer', (): void => {
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(false);
    globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(true);
  });



  describe('return value', (): void => {

    let removeDispatcher: () => boolean;
    beforeEach((): void => {
      removeDispatcher = globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    });

    it('should be a function', (): void => {
      expect(removeDispatcher).to.be.a('function');
    });

    it('should accept no parameters', (): void => {
      expect(removeDispatcher.length).to.equal(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(true);
      removeDispatcher();
      expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(false);
    });
  });
};
