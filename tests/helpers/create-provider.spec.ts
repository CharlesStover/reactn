import { expect } from 'chai';
import { Component } from 'react';
import { createProvider } from '../../index';

describe('createProvider', () => {

  it('should return a React Component', () => {
    expect(createProvider().prototype).to.be.instanceOf(Component);
  });

  describe('Provider', () => {

    it('should have static methods', () => {
      const Provider = createProvider();
      // @ts-ignore
      expect(Provider.test).not.to.be.a('function');
      expect(Provider.addCallback).to.be.a('function');
      expect(Provider.addReducer).to.be.a('function');
      expect(Provider.getGlobal).to.be.a('function');
      expect(Provider.removeCallback).to.be.a('function');
      expect(Provider.resetGlobal).to.be.a('function');
      expect(Provider.setGlobal).to.be.a('function');
      expect(Provider.useGlobal).to.be.a('function');
      expect(Provider.withGlobal).to.be.a('function');
      // expect(Provider.useGlobal.length).to.equal(useGlobal.length - 1);
    });

  });

});
