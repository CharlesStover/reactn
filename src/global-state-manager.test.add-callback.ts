import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';



const CALLBACK: Callback<{}> = (): void => { };



export default (): void => {

  let globalStateManager: GlobalStateManager<{}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}>({});
  });

  it('should be a function', (): void => {
    expect(globalStateManager.addCallback).to.be.a('function');
  });

  it('should accept 1 parameter', (): void => {
    expect(globalStateManager.addCallback.length).to.equal(1);
  });

  it('should add a callback', (): void => {
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
  });



  describe('return value', (): void => {

    let removeCallback: () => boolean;
    beforeEach((): void => {
      removeCallback = globalStateManager.addCallback(CALLBACK);
    });

    it('should be a function', (): void => {
      expect(removeCallback).to.be.a('function');
    });

    it('should accept no parameters', (): void => {
      expect(removeCallback.length).to.equal(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
      removeCallback();
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
    });
  });
};