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

  it('should be a function with 2 arguments', (): void => {
    expect(Provider.addReducer).to.be.a('function');
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

    it('should be a function with no arguments', (): void => {
      expect(removeReducer).to.be.a('function');
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
