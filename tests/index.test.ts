import React = require('react');
import ReactN from '../build/index';
const reactn = require('../build/index');



// These properties should not match React.
const overrides: Set<string> = new Set([
  'Component', 'default', 'PureComponent'
]);



describe('package.json main', (): void => {

  it('should support import or require', (): void => {
    expect(reactn).toBe(ReactN);
    expect(reactn.default).toBe(ReactN);
    expect(reactn).toBe(ReactN.default);
  });

  it('should extend React', (): void => {

    // Overrides should not match React.
    const entries: [ string, any ][] =
      Object.entries(React)
        .filter(([ property ]) => !overrides.has(property));

    // All remaining properties should match React.
    for (const [ key, value ] of entries) {
      expect(ReactN[key]).toStrictEqual(value);
    }
  });

  it('should override some React values', (): void => {
    for (const override of overrides) {
      expect(ReactN[override]).not.toEqual(React[override]);
    }
  });

  // addCallback
  it('should contain addCallback', (): void => {
    expect(ReactN.addCallback).toBeInstanceOf(Function);
    expect(ReactN.addCallback).toHaveLength(1);
  });

  // addReducer
  it('should contain addReducer', (): void => {
    expect(ReactN.addReducer).toBeInstanceOf(Function);
    expect(ReactN.addReducer).toHaveLength(2);
  });

  // addReducers
  it('should contain addReducers', (): void => {
    expect(ReactN.addReducers).toBeInstanceOf(Function);
    expect(ReactN.addReducers).toHaveLength(1);
  });

  // Component
  it('should contain the ReactN Component class', (): void => {
    expect(ReactN.Component).toBeInstanceOf(Function);
  });

  // createProvider
  it('should contain createProvider', (): void => {
    expect(ReactN.createProvider).toBeInstanceOf(Function);
    expect(ReactN.createProvider).toHaveLength(2);
  });

  // default
  it('should contain the @reactn decorator', (): void => {
    expect(ReactN).toBeInstanceOf(Function);
    expect(ReactN.default).toBeInstanceOf(Function);
    expect(ReactN).toBe(ReactN.default);
  });

  // getDispatch
  it('should contain getDispatch', (): void => {
    expect(ReactN.getDispatch).toBeInstanceOf(Function);
    expect(ReactN.getDispatch).toHaveLength(0);
  });

  // getGlobal
  it('should contain getGlobal', (): void => {
    expect(ReactN.getGlobal).toBeInstanceOf(Function);
    expect(ReactN.getGlobal).toHaveLength(0);
  });

  // PureComponent
  it('should contain the ReactN PureComponent class', (): void => {
    expect(ReactN.PureComponent).toBeInstanceOf(Function);
  });

  // removeCallback
  it('should contain removeCallback', (): void => {
    expect(ReactN.removeCallback).toBeInstanceOf(Function);
    expect(ReactN.removeCallback).toHaveLength(1);
  });

  // resetGlobal
  it('should contain resetGlobal', (): void => {
    expect(ReactN.resetGlobal).toBeInstanceOf(Function);
    expect(ReactN.resetGlobal).toHaveLength(0);
  });

  // setGlobal
  it('should contain setGlobal', (): void => {
    expect(ReactN.setGlobal).toBeInstanceOf(Function);
    expect(ReactN.setGlobal).toHaveLength(2);
  });

  // useGlobal
  it('should contain useGlobal', (): void => {
    expect(ReactN.useGlobal).toBeInstanceOf(Function);
    expect(ReactN.useGlobal).toHaveLength(1);
  });

  // useDispatch
  it('should contain useDispatch', (): void => {
    expect(ReactN.useDispatch).toBeInstanceOf(Function);
    expect(ReactN.useDispatch).toHaveLength(1);
  });

  // withGlobal
  it('should contain withGlobal', (): void => {
    expect(ReactN.withGlobal).toBeInstanceOf(Function);
    expect(ReactN.withGlobal).toHaveLength(2);
  });

});
