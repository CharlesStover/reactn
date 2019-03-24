import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';



const CALLBACK: Callback<{}> = () => {};



export default (): void => {

  let globalStateManager: GlobalStateManager<{}>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}>({});
  });

  it('should be a function', () => {
    expect(globalStateManager.addCallback).to.be.a('function');
  });

  it('should accept 1 parameter', () => {
    expect(globalStateManager.addCallback.length).to.equal(1);
  });

  it('should add a callback', () => {
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
  });



  describe('return value', () => {

    let removeCallback: () => boolean;
    beforeEach(() => {
      removeCallback = globalStateManager.addCallback(CALLBACK);
    });

    it('should be a function', () => {
      expect(removeCallback).to.be.a('function');
    });

    it('should accept no parameters', () => {
      expect(removeCallback.length).to.equal(0);
    });

    it('should remove the callback', () => {
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
      removeCallback();
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
    });
  });
};
