import { expect } from 'chai';
import { Component } from 'react';
import createProvider, { ReactNProvider } from '../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';



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



    describe('with an initial state', (): void => {

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



    describe('with an initial state and reducers', (): void => {

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
