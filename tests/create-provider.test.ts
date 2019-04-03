import { Component } from 'react';
import createProvider, { ReactNProvider } from '../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';



describe('createProvider', (): void => {

  it('should be a function with 2 arguments', (): void => {
    expect(createProvider).toEqual(expect.any(Function));
    expect(createProvider).toHaveLength(2);
  });



  describe('return value', (): void => {

    describe('with no parameters', (): void => {

      let Provider: ReactNProvider<{}, {}>;
      beforeEach((): void => {
        Provider = createProvider();
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toEqual(Component);
      });

      it('should have an empty state', (): void => {
        expect(Provider.global).toEqual({});
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).toEqual({});
      });
    });



    describe('with an initial state', (): void => {

      let Provider: ReactNProvider<GS>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toEqual(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).toEqual(INITIAL_STATE);
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).toEqual({});
      });
    });



    describe('with an initial state and reducers', (): void => {

      let Provider: ReactNProvider<GS, R>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toEqual(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).toEqual(INITIAL_STATE);
      });

      it('should have dispatchers', (): void => {
        const initialKeys = Object.keys(INITIAL_REDUCERS).sort();
        const setKeys = Object.keys(Provider.dispatch).sort();
        expect(initialKeys).toEqual(setKeys);
      });
    });

  });

});
