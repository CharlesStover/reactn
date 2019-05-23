import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.flush', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.flush).toBeInstanceOf(Function);
    expect(globalStateManager.flush).toHaveLength(2);
  });

  it('should return an object', (): void => {
    expect(typeof globalStateManager.flush()).toBe('object');
  });

  it('should return the state change', (): void => {
    globalStateManager.enqueue('x', true);
    const stateChange: Partial<G> = globalStateManager.flush();
    expect(stateChange.x).toBe(true);
    expect(stateChange.y).toBeUndefined();
    expect(stateChange.z).toBeUndefined();
  });

  it('should clear the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).toBe(1);
    globalStateManager.flush();
    expect(globalStateManager.queue.size).toBe(0);
  });

  it('should write the queue to the state', (): void => {
    expect(globalStateManager.state.x).toBe(false);
    globalStateManager.enqueue('x', true);
    globalStateManager.flush();
    expect(globalStateManager.state.x).toBe(true);
  });
});
