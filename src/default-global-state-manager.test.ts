import { expect } from 'chai';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';

describe('Default GlobalStateManager', () => {
  it('should be a GlobalStateManager', () => {
    expect(defaultGlobalStateManager).to.be.instanceOf(GlobalStateManager);
  });

  it('should be empty', () => {
    expect(defaultGlobalStateManager.state).to.deep.equal({});
  })
});
