import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



describe('GlobalStateManager.flush', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.flush).to.be.a('function');
    expect(globalStateManager.flush.length).to.equal(0);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.flush()).to.be.undefined;
  });

  it('should clear the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).to.equal(1);
    globalStateManager.flush();
    expect(globalStateManager.queue.size).to.equal(0);
  });

  it('should write the queue to the state', (): void => {
    expect(globalStateManager.state.x).to.equal(false);
    globalStateManager.enqueue('x', true);
    globalStateManager.flush();
    expect(globalStateManager.state.x).to.equal(true);
  });
});
