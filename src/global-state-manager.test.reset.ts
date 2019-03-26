import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.reset).to.be.a('function');
    expect(globalStateManager.reset.length).to.equal(0);
  });

  it.skip('should do more', (): void => {
  });
};
