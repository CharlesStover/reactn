import { expect } from 'chai';
import React from 'react';
import ReactN from './index';
const reactn = require('./index');



// These properties should not match React.
const overrides: Set<string> = new Set([
  'Component', 'default', 'PureComponent'
]);



describe('package.json main', () => {

  it('should support import or require', () => {
    expect(reactn).to.equal(ReactN);
  });

  it('should extend React', () => {

    // Overrides should not match React.
    const entries: [ string, any ][] =
      Object.entries(React)
      .filter(([ property ]) => !overrides.has(property));

    // All remaining properties should match React.
    for (const [ key, value ] of entries) {
      expect(ReactN[key]).to.equal(value);
    }
  });

  it('should override some React values', () => {
    for (const override of overrides) {
      expect(ReactN[override]).not.to.equal(React[override]);
    }
  });

  // addCallback
  it('should contain addCallback', () => {
    expect(ReactN.addCallback).to.be.a('function');
    expect(ReactN.addCallback.length).to.equal(1);
  });

  // SPY ON defaultGlobalState

  // addReducer
  it('should contain addReducer', () => {
    expect(ReactN.addReducer).to.be.a('function');
    expect(ReactN.addReducer.length).to.equal(2);
  });

  // SPY ON defaultGlobalState

  // Component
  it('should contain the ReactN Component class', () => {
    expect(ReactN.Component).to.be.a('function');
  });

  // createProvider
  it('should contain createProvider', () => {
    expect(ReactN.createProvider).to.be.a('function');
    expect(ReactN.createProvider.length).to.equal(1);
  });

  // SPY ON defaultGlobalState

  // default
  it('should contain the @reactn decorator', () => {
    expect(ReactN).to.be.a('function');
    expect(ReactN.default).to.be.a('function');
    expect(ReactN).to.equal(ReactN.default);
  });

  // getGlobal
  it('should contain getGlobal', () => {
    expect(ReactN.getGlobal).to.be.a('function');
    expect(ReactN.getGlobal.length).to.equal(0);
  });

  // PureComponent
  it('should contain the ReactN PureComponent class', () => {
    expect(ReactN.PureComponent).to.be.a('function');
  });

  // removeCallback
  it('should contain removeCallback', () => {
    expect(ReactN.removeCallback).to.be.a('function');
    expect(ReactN.removeCallback.length).to.equal(1);
  });

  // resetGlobal
  it('should contain resetGlobal', () => {
    expect(ReactN.resetGlobal).to.be.a('function');
    expect(ReactN.resetGlobal.length).to.equal(0);
  });

  // setGlobal
  it('should contain setGlobal', () => {
    expect(ReactN.setGlobal).to.be.a('function');
    expect(ReactN.setGlobal.length).to.equal(2);
  });

  // useGlobal
  it('should contain useGlobal', () => {
    expect(ReactN.useGlobal).to.be.a('function');
    expect(ReactN.useGlobal.length).to.equal(2);
  });

  // withGlobal
  it('should contain withGlobal', () => {
    expect(ReactN.withGlobal).to.be.a('function');
    expect(ReactN.withGlobal.length).to.equal(2);
  });

});
