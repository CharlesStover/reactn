import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.flush', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.flush).toEqual(expect.any(Function));;
    expect(globalStateManager.flush.length).toBe(0);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.flush()).toBeUndefined();
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
