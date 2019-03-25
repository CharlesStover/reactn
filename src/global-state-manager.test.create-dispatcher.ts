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

  it('should accept 1 parameter', (): void => {
    expect(globalStateManager.createDispatcher.length).to.equal(1);
  });

  it.skip('should do more', (): void => {
  });

};
