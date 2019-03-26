import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';



interface GS {
  x: boolean;
}

const INITIAL_STATE: GS = {
  x: false,
};



export default (): void => {

  let globalStateManager: GlobalStateManager<GS, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS, {}>(INITIAL_STATE);
  });

  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.clearQueue).to.be.a('function');
    expect(globalStateManager.clearQueue.length).to.equal(0);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.clearQueue()).to.be.undefined;
  });

  it('should clear the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).to.equal(1);
    globalStateManager.clearQueue();
    expect(globalStateManager.queue.size).to.equal(0);
  });
};
