import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = [ boolean, number, string ];



const REDUCER_ARGS: A = [ true, 1, 'str' ];

const REDUCER_NAME: string = 'reducerName';

const STATE_CHANGE: Partial<G> = {
  x: true,
};



describe('GlobalStateManager.setObject', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('enqueue', 'flush');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(globalStateManager.setObject).toBeInstanceOf(Function);
    expect(globalStateManager.setObject).toHaveLength(3);
  });

  it('should call enqueue and flush', async (): Promise<void> => {
    await globalStateManager.setObject(
      STATE_CHANGE,
      REDUCER_NAME,
      REDUCER_ARGS
    );
    expect(spy.enqueue).toHaveBeenCalledTimes(1);
    expect(spy.enqueue).toHaveBeenCalledWith('x', STATE_CHANGE.x);

    expect(spy.flush).toHaveBeenCalledTimes(1);
    expect(spy.flush).toHaveBeenCalledWith(REDUCER_NAME, REDUCER_ARGS);
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setObject(STATE_CHANGE, REDUCER_NAME, REDUCER_ARGS);
      expect(set).toBeInstanceOf(Promise);
      await set;
    });

    it('should resolve to the state change', async (): Promise<void> => {
      const set: Promise<Partial<G>> =
        globalStateManager.setObject(STATE_CHANGE, REDUCER_NAME, REDUCER_ARGS);
      const stateChange: Partial<G> = await set;
      expect(stateChange).toEqual(STATE_CHANGE);
    });
  });

});
