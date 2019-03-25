import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', (): void => {
    expect(globalStateManager.createDispatcher).to.be.a('function');
  });

  it('should accept no parameters', (): void => {
    expect(globalStateManager.createDispatcher.length).to.equal(0);
  });

  it.skip('should return a dispatcher', (): void => {
  });

};
