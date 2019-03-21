import { expect } from 'chai';
import * as React from 'react';
import spyOn from '../utils/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';

type RemoveAddedCallback = () => boolean;
type RemoveAddedReducer = () => boolean;
type VoidFunction = () => void;

interface GlobalState {
  x: boolean;
  y: number;
  z: string;
}

const INITIAL_X: GlobalState['x'] = true;
const INITIAL_Y: GlobalState['y'] = 1;
const INITIAL_Z: GlobalState['z'] = 'string';

const UPDATED_X: GlobalState['x'] = false;
const UPDATED_Y: GlobalState['y'] = 2;
const UPDATED_Z: GlobalState['z'] = 'any';

const initialState = {
  x: INITIAL_X,
  y: INITIAL_Y,
  z: INITIAL_Z,
};

const updatedState = {
  x: UPDATED_X,
  y: UPDATED_Y,
  z: UPDATED_Z,
};

describe('createProvider', () => {

  let Provider: ReactNProvider<GlobalState>;
  beforeEach(() => {
    Provider = createProvider(initialState);
  });

  it('should create a React Component', () => {
    expect(Object.getPrototypeOf(Provider))
      .to.equal(React.Component);
  });
});



describe('ReactN Provider', () => {

  let Provider: ReactNProvider<GlobalState>;
  beforeEach(() => {
    Provider = createProvider(initialState);
  });



  describe('addCallback', () => {

    const spy = spyOn('addCallback');

    it('should exist', () => {
      expect(Provider.addCallback).to.be.a('function');
      expect(Provider.addCallback.length).to.equal(1);
    });

    it('should call GlobalStateManager addCallback', () => {
      const callback = (): void => {};
      Provider.addCallback(callback);
      expect(spy.addCallback.calledOnceWithExactly(callback)).to.equal(true);
    });

    it('should return a remove callback function', () => {
      const callback = (): void => {};
      const removeCallback: RemoveAddedCallback =
        Provider.addCallback(callback);
      expect(removeCallback).to.be.a('function');
      expect(removeCallback.length).to.equal(0);
      expect(removeCallback()).to.equal(true);
    });
  });



  describe('addReducer', () => {

    const spy = spyOn('addReducer');

    it('should exist', () => {
      expect(Provider.addReducer).to.be.a('function');
      expect(Provider.addReducer.length).to.equal(2);
    });

    it('should call GlobalStateManager addReducer', () => {
      const name = 'REDUCER_NAME';
      const reducer = (): void => {};
      Provider.addReducer(name, reducer);
      expect(spy.addReducer.calledOnceWithExactly(name, reducer)).to.equal(true);
    });

    it('should return a remove reducer function', () => {
      const name = 'REDUCER_NAME';
      const reducer = (): void => {};
      const removeReducer: RemoveAddedReducer =
        Provider.addReducer(name, reducer);
      expect(removeReducer).to.be.a('function');
      expect(removeReducer.length).to.equal(0);
      expect(removeReducer()).to.equal(true);
    });
  });



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
     */
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

});
