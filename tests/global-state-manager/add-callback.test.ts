import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import Callback from '../../src/typings/callback';



const CALLBACK: Callback<{}> = (): void => { };



describe('GlobalStateManager.addCallback', (): void => {

  let globalStateManager: GlobalStateManager<{}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}>({});
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.addCallback).to.be.a('function');
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

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).to.be.a('function');
      expect(removeCallback.length).to.equal(0);
    });

    it('should remove the callback', (): void => {
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
      removeCallback();
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
    });
  });

});
