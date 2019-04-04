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
      expect(ReactN[key]).toEqual(value);
    }
  });

  it('should override some React values', (): void => {
    for (const override of overrides) {
      expect(ReactN[override]).not.toEqual(React[override]);
    }
  });

  // addCallback
  it('should contain addCallback', (): void => {
    expect(ReactN.addCallback).toEqual(expect.any(Function));
    expect(ReactN.addCallback.length).toBe(1);
  });

  // addReducer
  it('should contain addReducer', (): void => {
    expect(ReactN.addReducer).toEqual(expect.any(Function));
    expect(ReactN.addReducer.length).toBe(2);
  });

  // addReducers
  it('should contain addReducers', (): void => {
    expect(ReactN.addReducers).toEqual(expect.any(Function));
    expect(ReactN.addReducers.length).toBe(1);
  });

  // Component
  it('should contain the ReactN Component class', (): void => {
    expect(ReactN.Component).toEqual(expect.any(Function));
  });

  // createProvider
  it('should contain createProvider', (): void => {
    expect(ReactN.createProvider).toEqual(expect.any(Function));
    expect(ReactN.createProvider.length).toBe(2);
  });

  // default
  it('should contain the @reactn decorator', (): void => {
    expect(ReactN).toEqual(expect.any(Function));
    expect(ReactN.default).toEqual(expect.any(Function));
    expect(ReactN).toBe(ReactN.default);
  });

  // getGlobal
  it('should contain getGlobal', (): void => {
    expect(ReactN.getGlobal).toEqual(expect.any(Function));
    expect(ReactN.getGlobal).toHaveLength(0);
  });

  // PureComponent
  it('should contain the ReactN PureComponent class', (): void => {
    expect(ReactN.PureComponent).toEqual(expect.any(Function));
  });

  // removeCallback
  it('should contain removeCallback', (): void => {
    expect(ReactN.removeCallback).toEqual(expect.any(Function));
    expect(ReactN.removeCallback).toHaveLength(1);
  });

  // resetGlobal
  it('should contain resetGlobal', (): void => {
    expect(ReactN.resetGlobal).toEqual(expect.any(Function));
    expect(ReactN.resetGlobal).toHaveLength(0);
  });

  // setGlobal
  it('should contain setGlobal', (): void => {
    expect(ReactN.setGlobal).toEqual(expect.any(Function));
    expect(ReactN.setGlobal).toHaveLength(2);
  });

  // useGlobal
  it('should contain useGlobal', (): void => {
    expect(ReactN.useGlobal).toEqual(expect.any(Function));
    expect(ReactN.useGlobal).toHaveLength(2);
  });

  // withGlobal
  it('should contain withGlobal', (): void => {
    expect(ReactN.withGlobal).toEqual(expect.any(Function));
    expect(ReactN.withGlobal).toHaveLength(2);
  });

});
