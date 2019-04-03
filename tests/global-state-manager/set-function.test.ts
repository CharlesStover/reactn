import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const FUNC = (gs: GS): Partial<GS> => ({
  x: !gs.x,
});

const STATE_CHANGE: Partial<GS> = FUNC(INITIAL_STATE);



describe('GlobalStateManager.setFunction', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setFunction).toEqual(expect.any(Function));;
    expect(globalStateManager.setFunction.length).toBe(1);
  });

  it('should call set', async (): Promise<void> => {
    const set: Promise<GS> = globalStateManager.setFunction(FUNC);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
    await set;
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<GS | void> = globalStateManager.setFunction(FUNC);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.setFunction(FUNC);
      const value = await set;
      expect(value).toEqual({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });

});
