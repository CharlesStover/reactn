import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const STATE_CHANGE: Partial<GS> = {
  x: true,
};



describe('GlobalStateManager.setObject', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('enqueue', 'flush');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setObject).toEqual(expect.any(Function));;
    expect(globalStateManager.setObject.length).toBe(1);
  });

  it('should call enqueue and flush', async (): Promise<void> => {
    await globalStateManager.setObject(STATE_CHANGE);
    expect(spy.enqueue).toHaveBeenCalledTimes(1);
    expect(spy.enqueue).toHaveBeenCalledWith('x', STATE_CHANGE.x);

    expect(spy.flush).toHaveBeenCalledTimes(1);
    expect(spy.flush).toHaveBeenCalledWith();
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<GS | void> =
        globalStateManager.setObject(STATE_CHANGE);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.setObject(STATE_CHANGE);
      const value = await set;
      expect(value).toEqual({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });

});
