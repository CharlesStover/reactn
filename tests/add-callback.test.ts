import { expect } from 'chai';
import GlobalStateManager from '../src/global-state-manager';
import addCallback from '../src/helpers/add-callback';
import Callback from '../src/typings/callback';
import { GS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const CALLBACK: Callback<GS> = (_globalState: GS) => null;



describe('addCallback', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('addCallback', 'removeCallback');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(addCallback).to.be.a('function');
    expect(addCallback.length).to.equal(2);
  });

  it('should call GlobalStateManager.addCallback', (): void => {
    addCallback(globalStateManager, CALLBACK);
    expect(spy.addCallback.calledOnceWithExactly(CALLBACK))
      .to.equal(true);
  });



  describe('returned remove callback function', (): void => {

    let removeCallback: () => boolean;
    beforeEach((): void => {
      removeCallback = addCallback(globalStateManager, CALLBACK);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).to.be.a('function');
      expect(removeCallback.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeCallback', (): void => {
      removeCallback();
      expect(spy.removeCallback.calledOnceWithExactly(CALLBACK))
        .to.equal(true);
    });
  });

});
