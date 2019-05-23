import addCallback from '../src/add-callback';
import GlobalStateManager from '../src/global-state-manager';
import Callback from '../typings/callback';
import { G, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const CALLBACK: Callback<G> = (): null => null;



describe.only('addCallback', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('addCallback', 'removeCallback');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(addCallback).toBeInstanceOf(Function);
    expect(addCallback).toHaveLength(2);
  });

  it('should call GlobalStateManager.addCallback', (): void => {
    addCallback(globalStateManager, CALLBACK);
    expect(spy.addCallback).toHaveBeenCalledTimes(1);
    expect(spy.addCallback).toHaveBeenCalledWith(CALLBACK);
  });



  describe('returned remove callback function', (): void => {

    let removeCallback: () => boolean;
    beforeEach((): void => {
      removeCallback = addCallback(globalStateManager, CALLBACK);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).toBeInstanceOf(Function);
      expect(removeCallback).toHaveLength(0);
    });

    it('should call GlobalStateManager.removeCallback', (): void => {
      removeCallback();
      expect(spy.removeCallback).toHaveBeenCalledTimes(1);
      expect(spy.removeCallback).toHaveBeenCalledWith(CALLBACK);
    });
  });

});
