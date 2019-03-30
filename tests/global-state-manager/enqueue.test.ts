import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.enqueue', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.enqueue).to.be.a('function');
    expect(globalStateManager.enqueue.length).to.equal(2);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.enqueue('x', true)).to.be.undefined;
  });

  it('should update the queue', (): void => {
    expect(globalStateManager.queue.get('x')).to.be.undefined;
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).to.equal(1);
    expect(globalStateManager.queue.get('x')).to.equal(true);
  });
});
