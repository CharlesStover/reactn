import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it.skip('should be a function', (): void => {
    // expect(globalStateManager.setProperty).to.be.a('function');
  });

  it.skip('should accept 2 parameters', (): void => {
    // expect(globalStateManager.setProperty.length).to.equal(2);
  });

  it.skip('should do more', (): void => {
  });
};
