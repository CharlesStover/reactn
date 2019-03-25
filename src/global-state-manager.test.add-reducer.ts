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
    expect(globalStateManager.addReducer).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(globalStateManager.addReducer.length).to.equal(2);
  });

  it('should add a reducer', () => {
    expect(globalStateManager.hasReducer(REDUCER_NAME)).to.equal(false);
    globalStateManager.addReducer(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasReducer(REDUCER_NAME)).to.equal(true);
  });



  describe('return value', () => {

    let removeReducer: () => boolean;
    beforeEach(() => {
      removeReducer = globalStateManager.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function', () => {
      expect(removeReducer).to.be.a('function');
    });

    it('should accept no parameters', () => {
      expect(removeReducer.length).to.equal(0);
    });

    it('should remove the callback', () => {
      expect(globalStateManager.hasReducer(REDUCER_NAME)).to.equal(true);
      removeReducer();
      expect(globalStateManager.hasReducer(REDUCER_NAME)).to.equal(false);
    });
  });
};
