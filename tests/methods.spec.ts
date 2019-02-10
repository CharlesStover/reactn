// import defaultGlobalState from '../src/default-global-state';
import resetGlobal from '../src/helpers/reset-global';
/*
import {
  ReactNComponentWillUnmount, ReactNGlobalCallback, ReactNGlobal,
  ReactNSetGlobal
} from '../src/methods';
*/

describe('Component methods', () => {

  afterEach(resetGlobal);

  describe('static getDerivedStateFromProps', () => {

    it('should support getDerivedGlobalFromProps');

  });

  describe('componentWillUnmount', () => {

    it('should remove its instance\'s property listeners');

  });

  describe('_globalCallback', () => {

    it('should be called as a property listener');

  });

  describe('global', () => {

    it('should return the global state with property listeners');

  });

  describe('setGlobal', () => {

    it('should accept a function');

    it('should accept a promise');

    it('should accept an object');

  });
});
