import { expect } from 'chai';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });

  it('should be a function', (): void => {
    expect(Provider.setGlobal).to.be.a('function');
  });

  it('should accept 2 parameters', (): void => {
    expect(Provider.setGlobal.length).to.equal(2);
  });

  it.skip('should do more', (): void => {
  });
};

/*
export default (): void => {

    const spy = spyOn('set', 'setFunction', 'setObject', 'setPromise');

    afterEach((): void => {
      Provider.reset();
    });

    it('should exist', (): void => {
      expect(Provider.setGlobal).to.be.a('function');
      expect(Provider.setGlobal.length).to.equal(2);
    });

    /**
     * TODO:
     * MOVE THIS TO GLOBAL STATE MANAGER TEST
     * REFACTOR CREATEPROVIDER TO BEHAVE
     * THE WAY SETGLOBAL DOES
     *
    describe('GlobalStateManager', (): void => {

      it('should call set', (): void => {
        Provider.setGlobal(updatedState);
        expect(spy.set.calledOnceWithExactly(updatedState)).to.equal(true);
      });

      it('should call setFunction', (): void => {
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

      it('should call setObject', (): void => {
        Provider.setGlobal(updatedState);
        expect(spy.set.calledOnceWithExactly(updatedState)).to.equal(true);
        expect(spy.setObject.calledOnceWithExactly(updatedState)).to.equal(true);
      });

      it('should call setPromise', async (): void => {
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
};
*/
