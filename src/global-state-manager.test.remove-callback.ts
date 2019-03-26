import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';



const CALLBACK = (): void => { };



export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removeCallback).to.be.a('function');
    expect(globalStateManager.removeCallback.length).to.equal(1);
  });

  it('remove a callback', (): void => {
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
    globalStateManager.removeCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
  });

  describe('return value', (): void => {

    it('should be true if the callback existed', (): void => {
      globalStateManager.addCallback(CALLBACK);
      const removed: boolean = globalStateManager.removeCallback(CALLBACK);
      expect(removed).to.equal(true);
    });

    it('should be false if the callback did not exist', (): void => {
      const removed: boolean = globalStateManager.removeCallback(CALLBACK);
      expect(removed).to.equal(false);
    });
  });

};
