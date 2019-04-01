import { expect } from 'chai';
import React = require('react');
import ReactN from '../build/index';
const reactn = require('../build/index');



// These properties should not match React.
const overrides: Set<string> = new Set([
  'Component', 'default', 'PureComponent'
]);



describe('package.json main', (): void => {

  it('should support import or require', (): void => {
    expect(reactn).to.equal(ReactN);
    expect(reactn.default).to.equal(ReactN);
    expect(reactn).to.equal(ReactN.default);
  });

  it('should extend React', (): void => {

    // Overrides should not match React.
    const entries: [ string, any ][] =
      Object.entries(React)
        .filter(([ property ]) => !overrides.has(property));

    // All remaining properties should match React.
    for (const [ key, value ] of entries) {
      expect(ReactN[key]).to.equal(value);
    }
  });

  it('should override some React values', (): void => {
    for (const override of overrides) {
      expect(ReactN[override]).not.to.equal(React[override]);
    }
  });

  // addCallback
  it('should contain addCallback', (): void => {
    expect(ReactN.addCallback).to.be.a('function');
    expect(ReactN.addCallback.length).to.equal(1);
  });

  // addReducer
  it('should contain addReducer', (): void => {
    expect(ReactN.addReducer).to.be.a('function');
    expect(ReactN.addReducer.length).to.equal(2);
  });

  // addReducers
  it('should contain addReducers', (): void => {
    expect(ReactN.addReducers).to.be.a('function');
    expect(ReactN.addReducers.length).to.equal(1);
  });

  // Component
  it('should contain the ReactN Component class', (): void => {
    expect(ReactN.Component).to.be.a('function');
  });

  // createProvider
  it('should contain createProvider', (): void => {
    expect(ReactN.createProvider).to.be.a('function');
    expect(ReactN.createProvider.length).to.equal(2);
  });

  // default
  it('should contain the @reactn decorator', (): void => {
    expect(ReactN).to.be.a('function');
    expect(ReactN.default).to.be.a('function');
    expect(ReactN).to.equal(ReactN.default);
  });

  // getGlobal
  it('should contain getGlobal', (): void => {
    expect(ReactN.getGlobal).to.be.a('function');
    expect(ReactN.getGlobal.length).to.equal(0);
  });

  // PureComponent
  it('should contain the ReactN PureComponent class', (): void => {
    expect(ReactN.PureComponent).to.be.a('function');
  });

  // removeCallback
  it('should contain removeCallback', (): void => {
    expect(ReactN.removeCallback).to.be.a('function');
    expect(ReactN.removeCallback.length).to.equal(1);
  });

  // resetGlobal
  it('should contain resetGlobal', (): void => {
    expect(ReactN.resetGlobal).to.be.a('function');
    expect(ReactN.resetGlobal.length).to.equal(0);
  });

  // setGlobal
  it('should contain setGlobal', (): void => {
    expect(ReactN.setGlobal).to.be.a('function');
    expect(ReactN.setGlobal.length).to.equal(2);
  });

  // useGlobal
  it('should contain useGlobal', (): void => {
    expect(ReactN.useGlobal).to.be.a('function');
    expect(ReactN.useGlobal.length).to.equal(2);
  });

  // withGlobal
  it('should contain withGlobal', (): void => {
    expect(ReactN.withGlobal).to.be.a('function');
    expect(ReactN.withGlobal.length).to.equal(2);
  });

});
