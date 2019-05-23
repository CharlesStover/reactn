import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = [ boolean, number, string ];



const FUNC = (gs: G): Partial<G> => ({
  x: !gs.x,
});

const REDUCER_ARGS: A = [ true, 1, 'str' ];

const REDUCER_NAME: string = 'reducerName';

const STATE_CHANGE: Partial<G> = Object.assign(Object.create(null), {
  x: true,
});



describe('GlobalStateManager.setFunction', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(globalStateManager.setFunction).toBeInstanceOf(Function);
    expect(globalStateManager.setFunction).toHaveLength(3);
  });

  it('should call set', async (): Promise<void> => {
    const set: Promise<Partial<G>> =
      globalStateManager.setFunction(FUNC, REDUCER_NAME, REDUCER_ARGS);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set)
      .toHaveBeenCalledWith(STATE_CHANGE, REDUCER_NAME, REDUCER_ARGS);
    await set;
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setFunction(FUNC, REDUCER_NAME, REDUCER_ARGS);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the state change', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setFunction(FUNC, REDUCER_NAME, REDUCER_ARGS);
      const stateChange: Partial<G> = await set;
      expect(stateChange).toStrictEqual(STATE_CHANGE);
    });
  });

});
