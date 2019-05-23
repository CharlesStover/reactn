import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = [ boolean, number, string ];



const REDUCER_ARGS: A = [ true, 1, 'str' ];

const REDUCER_NAME: string = 'reducerName';

const STATE_CHANGE: Partial<G> = {
  x: true,
};

const PROMISE: Promise<Partial<G>> = Promise.resolve(STATE_CHANGE);



describe('GlobalStateManager.setPromise', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(globalStateManager.setPromise).toBeInstanceOf(Function);
    expect(globalStateManager.setPromise).toHaveLength(3);
  });

  it('should call set', async (): Promise<void> => {
    await globalStateManager.setPromise(PROMISE, REDUCER_NAME, REDUCER_ARGS);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set)
      .toHaveBeenCalledWith(STATE_CHANGE, REDUCER_NAME, REDUCER_ARGS);
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setPromise(PROMISE, REDUCER_NAME, REDUCER_ARGS);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the state change', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setPromise(PROMISE, REDUCER_NAME, REDUCER_ARGS);
      const stateChange: Partial<G> = await set;
      expect(stateChange).toEqual(STATE_CHANGE);
    });
  });

});
