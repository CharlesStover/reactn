import testAddCallback from './global-state-manager.test.add-callback';
import testAddPropertyListener from './global-state-manager.test.add-property-listener';
import testAddReducer from './global-state-manager.test.add-reducer';
import testConstructor from './global-state-manager.test.constructor';
import testCreateDispatcher from './global-state-manager.test.create-dispatcher';
import testEnqueue from './global-state-manager.test.enqueue';
import testFlush from './global-state-manager.test.flush';
import testRemoveCallback from './global-state-manager.test.remove-callback';
import testRemovePropertyListener from './global-state-manager.test.remove-property-listener';
import testRemoveReducer from './global-state-manager.test.remove-reducer';
import testReset from './global-state-manager.test.reset';
import testSet from './global-state-manager.test.set';
import testSetFunction from './global-state-manager.test.set-function';
import testSetObject from './global-state-manager.test.set-object';
import testSetPromise from './global-state-manager.test.set-promise';
import testSetProperty from './global-state-manager.test.set-property';
import testSpyState from './global-state-manager.test.spy-state';

describe('GlobalStateManager', () => {
  describe('constructor', testConstructor);
  describe('addCallback', testAddCallback);
  describe('addPropertyListener', testAddPropertyListener);
  describe('addReducer', testAddReducer);
  describe.skip('createDispatcher', testCreateDispatcher);
  describe.skip('enqueue', testEnqueue);
  describe.skip('flush', testFlush);
  describe.skip('removeCallback', testRemoveCallback);
  describe.skip('removePropertyListener', testRemovePropertyListener);
  describe.skip('removeReducer', testRemoveReducer);
  describe.skip('reset', testReset);
  describe.skip('set', testSet);
  describe.skip('setFunction', testSetFunction);
  describe.skip('setObject', testSetObject);
  describe.skip('commit', testSetPromise);
  describe.skip('setProperty', testSetProperty);
  describe.skip('spyState', testSpyState);
});