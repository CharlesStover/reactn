import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const FUNC = (gs: G): Partial<G> => ({
  x: !gs.x,
});

const STATE_CHANGE: Partial<G> = FUNC(INITIAL_STATE);



describe('GlobalStateManager.setFunction', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setFunction).toBeInstanceOf(Function);
    expect(globalStateManager.setFunction).toHaveLength(1);
  });

  it('should call set', async (): Promise<void> => {
    const set: Promise<G> = globalStateManager.setFunction(FUNC);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
    await set;
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<G | void> = globalStateManager.setFunction(FUNC);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<G> = globalStateManager.setFunction(FUNC);
      const value = await set;
      expect(value).toEqual({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });

});
