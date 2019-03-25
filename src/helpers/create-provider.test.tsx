import { expect } from 'chai';
import * as React from 'react';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';
import testAddCallback from './create-provider.test.add-callback';
import testAddReducer from './create-provider.test.add-reducer';
import testDispatch from './create-provider.test.dispatch';
import testGetDispatch from './create-provider.test.get-dispatch';
import testGetGlobal from './create-provider.test.get-global';
import testGlobal from './create-provider.test.global';



describe('createProvider', () => {

  it('should be a function', () => {
    expect(createProvider).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(createProvider.length).to.equal(2);
  });

  describe('return value', () => {

    describe('with no parameters', () => {

      let Provider: ReactNProvider<{}, {}>;
      beforeEach(() => {
        Provider = createProvider();
      });

      it('should be a React Component', () => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(React.Component);
      });

      it('should have an empty state', () => {
        expect(Provider.global).to.deep.equal({});
      });

      it('should have empty dispatchers', () => {
        expect(Provider.dispatch).to.deep.equal({});
      });
    });

    describe('with 1 parameter', () => {

      let Provider: ReactNProvider<GS>;
      beforeEach(() => {
        Provider = createProvider(INITIAL_STATE);
      });

      it('should be a React Component', () => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(React.Component);
      });

      it('should have a state', () => {
        expect(Provider.global).to.deep.equal(INITIAL_STATE);
      });

      it('should have empty dispatchers', () => {
        expect(Provider.dispatch).to.deep.equal({});
      });
    });

    describe('with 2 parameters', () => {

      let Provider: ReactNProvider<GS, R>;
      beforeEach(() => {
        Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
      });

      it('should be a React Component', () => {
        expect(Object.getPrototypeOf(Provider))
          .to.equal(React.Component);
      });

      it('should have a state', () => {
        expect(Provider.global).to.deep.equal(INITIAL_STATE);
      });

      it('should have dispatchers', () => {
        const initialKeys = Object.keys(INITIAL_REDUCERS).sort();
        const setKeys = Object.keys(Provider.dispatch).sort();
        expect(initialKeys).to.deep.equal(setKeys);
      });
    });

  });

});



describe('ReactN Provider', () => {

  describe('addCallback', testAddCallback);
  describe('addReducer', testAddReducer);
  describe('dispatch', testDispatch);
  describe('getDispatch', testGetDispatch);
  describe('getGlobal', testGetGlobal);
  describe('global', testGlobal);



  /*
  describe('getGlobal/global', () => {

    it('should exist', () => {
      expect(Provider.getGlobal).to.be.a('function');
      expect(Provider.getGlobal.length).to.equal(0);
      expect(Provider.global).to.be.an('object');
    });

    it('should be equal', () => {
      expect(Provider.getGlobal()).to.deep.equal(Provider.global);
    });

    it('should return the GlobalStateManager state', () => {
      expect(Provider.getGlobal()).to.deep.equal(initialState);
      expect(Provider.global).to.deep.equal(initialState);
    });

    it('should not have a setter', () => {
      expect(() => {
        // @ts-ignore: Deliberately throwing an error.
        Provider.global = true;
      }).to.throw();
    });
  });



  describe('removeCallback', () => {

    const spy = spyOn('removeCallback');

    it('should exist', () => {
      expect(Provider.removeCallback).to.be.a('function');
      expect(Provider.removeCallback.length).to.equal(1);
    });

    it('should call GlobalStateManager removeCallback', () => {
      const callback = (): void => {};
      Provider.removeCallback(callback);
      expect(spy.removeCallback.calledOnceWithExactly(callback)).to.equal(true);
    });

    it('should remove a valid callback', () => {
      const callback = (): void => {};
      Provider.addCallback(callback);
      expect(Provider.removeCallback(callback)).to.equal(true);
    });

    it('should fail to remove an invalid callback', () => {
      const callback = (): void => {};
      expect(Provider.removeCallback(callback)).to.equal(false);
    });
  });



  const resetTest = (method: 'reset' | 'resetGlobal'): VoidFunction =>
    (): void => {
  
      const spy = spyOn('reset');
    
      it('should exist', () => {
        expect(Provider[method]).to.be.a('function');
        expect(Provider[method].length).to.equal(0);
      });
    
      it('should call GlobalStateManager reset', () => {
        expect(spy.reset.calledOnceWithExactly()).to.equal(false);
        Provider[method]();
        expect(spy.reset.calledOnceWithExactly()).to.equal(true);
      });
    
      it('should return undefined', () => {
        expect(Provider[method]()).to.be.undefined;
      });

      it('should reset the state', () => {
        Provider.setGlobal(updatedState);
        expect(Provider.global.x).to.equal(UPDATED_X);
        expect(Provider.global.y).to.equal(UPDATED_Y);
        expect(Provider.global.z).to.equal(UPDATED_Z);
        Provider.reset();
        expect(Provider.global.x).to.equal(INITIAL_X);
        expect(Provider.global.y).to.equal(INITIAL_Y);
        expect(Provider.global.z).to.equal(INITIAL_Z);
      });
    };

  describe('reset', resetTest('reset'));
  describe('resetGlobal', resetTest('resetGlobal'));



  describe('setGlobal', () => {

    const spy = spyOn('set', 'setFunction', 'setObject', 'setPromise');

    afterEach(() => {
      Provider.reset();
    });

    it('should exist', () => {
      expect(Provider.setGlobal).to.be.a('function');
      expect(Provider.setGlobal.length).to.equal(2);
    });

    /**
     * TODO:
     * MOVE THIS TO GLOBAL STATE MANAGER TEST
     * REFACTOR CREATEPROVIDER TO BEHAVE
     * THE WAY SETGLOBAL DOES
     *
    describe('GlobalStateManager', () => {

      it('should call set', () => {
        Provider.setGlobal(updatedState);
        expect(spy.set.calledOnceWithExactly(updatedState)).to.equal(true);
      });

      it('should call setFunction', () => {
        const updatedStateFunction = (): GlobalState => updatedState;
        Provider.setGlobal(updatedStateFunction);
        expect(spy.set.callCount).to.equal(2);
        expect(spy.set.firstCall.calledWithExactly(updatedStateFunction))
          .to.equal(true);
        expect(spy.setFunction.calledOnceWithExactly(updatedStateFunction))
          .to.equal(true);
        expect(spy.set.secondCall.calledWithExactly(updatedState))
          .to.equal(true);
      });

      it('should call setObject', () => {
        Provider.setGlobal(updatedState);
        expect(spy.set.calledOnceWithExactly(updatedState)).to.equal(true);
        expect(spy.setObject.calledOnceWithExactly(updatedState)).to.equal(true);
      });

      it('should call setPromise', async () => {
        const updatedStatePromise: Promise<GlobalState> =
          Promise.resolve(updatedState);
        await Provider.setGlobal(updatedStatePromise);
        expect(spy.set.callCount).to.equal(2);
        expect(spy.set.firstCall.calledWithExactly(updatedStatePromise))
          .to.equal(true);
        expect(spy.setPromise.calledOnceWithExactly(updatedStatePromise))
          .to.equal(true);
        expect(spy.set.secondCall.calledWithExactly(updatedState))
          .to.equal(true);
      });
    });
  });



  describe('useGlobal', () => {

    it('should exist', () => {
      expect(Provider.useGlobal).to.be.a('function');
      expect(Provider.useGlobal.length).to.equal(2);
    });

    it.skip('should do more');
  });



  describe('withGlobal', () => {

    it('should exist', () => {
      expect(Provider.withGlobal).to.be.a('function');
      expect(Provider.withGlobal.length).to.equal(2);
    });

    it.skip('should do more');
  });
  */

});
