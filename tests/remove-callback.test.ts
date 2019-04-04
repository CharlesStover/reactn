import addCallback from '../src/add-callback';
import GlobalStateManager from '../src/global-state-manager';
import removeCallback from '../src/remove-callback';
import Callback from '../src/typings/callback';
import { GS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const CALLBACK: Callback<GS> = (): void => { };



describe('removeCallback', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('removeCallback');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(removeCallback).toEqual(expect.any(Function));
    expect(removeCallback).toHaveLength(2);
  });

  it('should call GlobalStateManager.removeCallback', (): void => {
    removeCallback(globalStateManager, CALLBACK);
    expect(spy.removeCallback).toHaveBeenCalledTimes(1);
    expect(spy.removeCallback).toHaveBeenCalledWith(CALLBACK);
  });

  describe('return value', (): void => {

    it('should be true if the callback existed', (): void => {
      addCallback(globalStateManager, CALLBACK);
      expect(removeCallback(globalStateManager, CALLBACK)).toBe(true);
    });

    it('should be false if the callback did not exist', (): void => {
      expect(removeCallback(globalStateManager, CALLBACK)).toBe(false);
    });
  });
});
