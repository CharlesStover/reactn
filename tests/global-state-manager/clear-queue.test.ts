import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.clearQueue', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.clearQueue).toBeInstanceOf(Function);
    expect(globalStateManager.clearQueue).toHaveLength(0);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.clearQueue()).toBeUndefined();
  });

  it('should clear the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).toBe(1);
    globalStateManager.clearQueue();
    expect(globalStateManager.queue.size).toBe(0);
  });
});
