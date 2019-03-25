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
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<GS, {}>(INITIAL_STATE);
  });

  it('should be a function', () => {
    expect(globalStateManager.enqueue).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(globalStateManager.enqueue.length).to.equal(2);
  });

  it('should not return anything', () => {
    expect(globalStateManager.enqueue('x', true)).to.be.undefined;
  });

  it('should update the queue', () => {
    expect(globalStateManager.queue.get('x')).to.be.undefined;
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).to.equal(1);
    expect(globalStateManager.queue.get('x')).to.equal(true);
  });
};
