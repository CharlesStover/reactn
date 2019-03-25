import { expect } from 'chai';
import spyOn from '../utils/test/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';



const REDUCER = (): void => {};

const REDUCER_NAME = 'REDUCER_NAME';



export default () => {

  const spy = spyOn('addDispatcher', 'removeDispatcher');

  let Provider: ReactNProvider<{}>;
  beforeEach(() => {
    Provider = createProvider();
  });

  it('should be a function', () => {
    expect(Provider.addReducer).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(Provider.addReducer.length).to.equal(2);
  });

  it('should call GlobalStateManager.addReducer', () => {
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(spy.addDispatcher.calledOnceWithExactly(REDUCER_NAME, REDUCER))
      .to.equal(true);
  });

  describe('return value', () => {

    let removeReducer: () => boolean;
    beforeEach(() => {
      removeReducer = Provider.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function', () => {
      expect(removeReducer).to.be.a('function');
    });

    it('should accept no parameters', () => {
      expect(removeReducer.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeReducer', () => {
      removeReducer();
      expect(spy.removeDispatcher.calledOnceWithExactly(REDUCER_NAME))
        .to.equal(true);
    });

    it('should return true', () => {
      expect(removeReducer()).to.equal(true);
    });
  });
};
