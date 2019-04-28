import { Component } from 'react';
import createProvider, { ReactNProvider } from '../src/create-provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';



const EMPTY_OBJECT: {} = Object.create(null);

const INITIAL_REDUCERS_KEYS: string[] = Object.keys(INITIAL_REDUCERS);

INITIAL_REDUCERS_KEYS.sort();



describe('createProvider', (): void => {

  it('should be a function with 2 arguments', (): void => {
    expect(createProvider).toBeInstanceOf(Function);
    expect(createProvider).toHaveLength(2);
  });



  describe('return value', (): void => {

    describe('with no parameters', (): void => {

      let Provider: ReactNProvider<{}, {}>;
      beforeEach((): void => {
        Provider = createProvider();
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toBe(Component);
      });

      it('should have an empty state', (): void => {
        expect(Provider.global).toStrictEqual(EMPTY_OBJECT);
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).toStrictEqual(EMPTY_OBJECT);
      });
    });



    describe('with an initial state', (): void => {

      let Provider: ReactNProvider<G>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toStrictEqual(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).toEqual(INITIAL_STATE);
      });

      it('should have empty dispatchers', (): void => {
        expect(Provider.dispatch).toStrictEqual(EMPTY_OBJECT);
      });
    });



    describe('with an initial state and reducers', (): void => {

      let Provider: ReactNProvider<G, R>;
      beforeEach((): void => {
        Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
      });

      it('should be a React Component', (): void => {
        expect(Object.getPrototypeOf(Provider)).toStrictEqual(Component);
      });

      it('should have a state', (): void => {
        expect(Provider.global).toEqual(INITIAL_STATE);
      });

      it('should have dispatchers', (): void => {
        const dispatchKeys: string[] = Object.keys(Provider.dispatch);
        dispatchKeys.sort();
        expect(dispatchKeys).toStrictEqual(INITIAL_REDUCERS_KEYS);
      });
    });

  });

});
