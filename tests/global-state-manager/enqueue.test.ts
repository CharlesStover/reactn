import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.enqueue', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.enqueue).toEqual(expect.any(Function));;
    expect(globalStateManager.enqueue.length).toBe(2);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.enqueue('x', true)).toBeUndefined();
  });

  it('should update the queue', (): void => {
    expect(globalStateManager.queue.get('x')).toBeUndefined();
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).toBe(1);
    expect(globalStateManager.queue.get('x')).toBe(true);
  });
});
