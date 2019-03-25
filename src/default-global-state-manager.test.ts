import { expect } from 'chai';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';

describe('Default GlobalStateManager', () => {

  it('should be a GlobalStateManager', () => {
    expect(defaultGlobalStateManager).to.be.instanceOf(GlobalStateManager);
  });

  it('should have an empty state', () => {
    expect(defaultGlobalStateManager.state).to.deep.equal({});
  });

  it('should not have dispatchers', () => {
    expect(defaultGlobalStateManager.dispatchers).to.deep.equal({});
  });
});
