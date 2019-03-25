import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', () => {
    expect(globalStateManager.flush).to.be.a('function');
  });

  it('should accept no parameters', () => {
    expect(globalStateManager.flush.length).to.equal(0);
  });

  it.skip('should not return anything', () => {
  });
};
