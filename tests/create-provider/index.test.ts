import { expect } from 'chai';
import { Component } from 'react';
import createProvider, { ReactNProvider } from '../../src/helpers/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import testAddCallback from './add-callback';
import testAddReducer from './add-reducer';
import testDispatch from './dispatch';
import testGetDispatch from './get-dispatch';
import testGetGlobal from './get-global';
import testGlobal from './global';
import testRemoveCallback from './remove-callback';
import testReset from './reset';
import testSetGlobal from './set-global';
import testUseGlobal from './use-global';
import testWithGlobal from './with-global';



describe('createProvider', (): void => {

  it('should be a function with 2 arguments', (): void => {
    expect(createProvider).to.be.a('function');
    expect(createProvider.length).to.equal(2);
  });

  describe('return value', (): void => {

    describe('with no parameters', (): void => {

      let Provider: ReactNProvider<{}, {}>;
      beforeEach((): void => {
        Provider = createProvider();
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(Component);
      });

      it('should have an empty state', (): void => {
        expect(Provider.global).to.deep.equal({});
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).to.deep.equal({});
      });
    });

    describe('with 1 parameter', (): void => {

      let Provider: ReactNProvider<GS>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).to.deep.equal(INITIAL_STATE);
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).to.deep.equal({});
      });
    });

    describe('with 2 parameters', (): void => {

      let Provider: ReactNProvider<GS, R>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).to.deep.equal(INITIAL_STATE);
      });

      it('should have dispatchers', (): void => {
        const initialKeys = Object.keys(INITIAL_REDUCERS).sort();
        const setKeys = Object.keys(Provider.dispatch).sort();
        expect(initialKeys).to.deep.equal(setKeys);
      });
    });

  });

});



describe('ReactN Provider', (): void => {
  describe('addCallback', testAddCallback);
  describe('addReducer', testAddReducer);
  describe('dispatch', testDispatch);
  describe('getDispatch', testGetDispatch);
  describe('getGlobal', testGetGlobal);
  describe('global', testGlobal);
  describe('removeCallback', testRemoveCallback);
  describe('reset', testReset);
  describe('setGlobal', testSetGlobal);
  describe('useGlobal', testUseGlobal);
  describe('withGlobal', testWithGlobal);
});
