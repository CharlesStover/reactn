import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', (): void => {
    expect(globalStateManager.removeCallback).to.be.a('function');
  });

  it('should accept 1 parameter', (): void => {
    expect(globalStateManager.removeCallback.length).to.equal(1);
  });

  it.skip('should do more', (): void => {
  });

};
