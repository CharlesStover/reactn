import { expect } from 'chai';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });

  it('should be a function', (): void => {
    expect(Provider.getDispatch).to.be.a('function');
  });

  it('should accept no parameters', (): void => {
    expect(Provider.getDispatch.length).to.equal(0);
  });

  it('should return dispatch', (): void => {
    expect(Provider.getDispatch()).to.deep.equal(Provider.dispatch);
  });
};
