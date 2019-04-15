import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const STATE_CHANGE: Partial<GS> = {
  x: true,
};

const PROMISE: Promise<Partial<GS>> = Promise.resolve(STATE_CHANGE);



describe('GlobalStateManager.setPromise', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setPromise).toBeInstanceOf(Function);
    expect(globalStateManager.setPromise).toHaveLength(1);
  });

  it('should call set', async (): Promise<void> => {
    await globalStateManager.setPromise(PROMISE);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<GS | void> = globalStateManager.setPromise(PROMISE);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.setPromise(PROMISE);
      const value = await set;
      expect(value).toEqual({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });

});
