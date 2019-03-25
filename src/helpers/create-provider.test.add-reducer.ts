import { expect } from 'chai';
import spyOn from '../utils/test/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';



const REDUCER = (): void => {};

const REDUCER_NAME = 'REDUCER_NAME';



export default (): void => {

  const spy = spyOn('addDispatcher', 'removeDispatcher');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });

  it('should be a function', (): void => {
    expect(Provider.addReducer).to.be.a('function');
  });

  it('should accept 2 parameters', (): void => {
    expect(Provider.addReducer.length).to.equal(2);
  });

  it('should call GlobalStateManager.addReducer', (): void => {
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(spy.addDispatcher.calledOnceWithExactly(REDUCER_NAME, REDUCER))
      .to.equal(true);
  });

  describe('return value', (): void => {

    let removeReducer: () => boolean;
    beforeEach((): void => {
      removeReducer = Provider.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function', (): void => {
      expect(removeReducer).to.be.a('function');
    });

    it('should accept no parameters', (): void => {
      expect(removeReducer.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeReducer', (): void => {
      removeReducer();
      expect(spy.removeDispatcher.calledOnceWithExactly(REDUCER_NAME))
        .to.equal(true);
    });

    it('should return true', (): void => {
      expect(removeReducer()).to.equal(true);
    });
  });
};
