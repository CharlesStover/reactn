import { expect } from 'chai';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });

  it('should be a function with 2 arguments', (): void => {
    expect(Provider.useGlobal).to.be.a('function');
    expect(Provider.useGlobal.length).to.equal(2);
  });

  it.skip('should do more', (): void => {
  });
};
