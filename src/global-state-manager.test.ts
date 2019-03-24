import testAddCallback from './global-state-manager.test.add-callback';
import testAddPropertyListener from './global-state-manager.test.add-property-listener';
import testConstructor from './global-state-manager.test.constructor';

describe('GlobalStateManager', () => {
  describe('constructor', testConstructor);
  describe('addCallback', testAddCallback);
  describe('addPropertyListener', testAddPropertyListener);
});
