import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('GlobalStateManager.reset', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
  });



  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.reset).toBeInstanceOf(Function);
    expect(globalStateManager.reset).toHaveLength(0);
  });

  it('should remove callbacks', (): void => {
    const CALLBACK = (): void => { };
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(true);
    globalStateManager.reset();
    expect(globalStateManager.hasCallback(CALLBACK)).toBe(false);
  });

  it('should reset dispatchers', (): void => {
    const REDUCER = (): null => null;
    const REDUCER_NAME = 'reducerName';

    globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher('increment')).toBe(true);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(true);
    globalStateManager.reset();
    expect(globalStateManager.hasDispatcher('increment')).toBe(true);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).toBe(false);
  });

  it('should remove property listeners', (): void => {
    const PROPERTY: keyof G = 'x';
    const PROPERTY_LISTENER = (): void => { };
    globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(true);
    globalStateManager.reset();
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(false);
  });

  it('should empty the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).toBe(1);
    globalStateManager.reset();
    expect(globalStateManager.queue.size).toBe(0);
  });

  it('should reset the state', async (): Promise<void> => {
    await globalStateManager.set({
      x: true,
      y: 1,
      z: 'any',
    });
    expect(globalStateManager.state).not.toEqual(INITIAL_STATE);
    globalStateManager.reset();
    expect(globalStateManager.state).toEqual(INITIAL_STATE);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.reset()).toBeUndefined();
  });
});
