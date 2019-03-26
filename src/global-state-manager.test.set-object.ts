import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setObject).to.be.a('function');
    expect(globalStateManager.setObject.length).to.equal(1);
  });

  it.skip('should do more', (): void => {
  });
};
