import { expect } from 'chai';
import React from 'react';
import createProvider, { ReactNProvider } from './create-provider';

type RemoveAddedCallback = () => boolean;

describe('createProvider', () => {

  let Provider: ReactNProvider<{}>;
  beforeEach(() => {
    Provider = createProvider();
  });

  it('should create a React Component', () => {
    expect(Provider).to.be.instanceOf(React.Component);
  });

  describe('static methods', () => {

    describe('addCallback', () => {

      it('should exist', () => {
        expect(Provider.addCallback).to.be.a('function');
        expect(Provider.addCallback.length).to.equal(1);
      });

      it('should return a remove callback function', () => {
        const removeCallback: RemoveAddedCallback =
          Provider.addCallback(() => {});
        expect(removeCallback).to.be.a('function');
        expect(removeCallback.length).to.equal(0);
        expect(removeCallback()).to.equal(true);
      });
    });

    it('addReducer', () => {
      expect(Provider.addReducer).to.exist;
      expect(Provider.addReducer.length).to.equal(1);
    });
  });
});

/*
static addReducer(name, reducer) {
  return addReducer(globalStateManager, name, reducer);
}

static getGlobal() {
  return globalStateManager.state;
}

static get global() {
  return globalStateManager.state;
}

static removeCallback(callback) {
  return globalStateManager.removeCallback(callback);
}

static resetGlobal() {
  return globalStateManager.reset();
}

static setGlobal(newGlobal, callback = null) {
  return setGlobal(globalStateManager, newGlobal, callback);
}

static useGlobal(property, setterOnly = false) {
  return useGlobal(globalStateManager, property, setterOnly);
}

static withGlobal(getter = global => global, setter = () => null) {
  return withGlobal(globalStateManager, getter, setter);
}

render() {
  return (
    <Context.Provider value={globalStateManager}>
      {this.props.children}
    </Context.Provider>
  );
}
*/
