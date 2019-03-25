import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', () => {
    expect(globalStateManager.createDispatcher).to.be.a('function');
  });

  it('should accept no parameters', () => {
    expect(globalStateManager.createDispatcher.length).to.equal(0);
  });

  it.skip('should return a dispatcher', () => {
  });

};
