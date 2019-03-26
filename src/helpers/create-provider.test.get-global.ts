import { expect } from 'chai';
import { GS, INITIAL_STATE } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE);
  });

  it('should be a function with no arguments', (): void => {
    expect(Provider.getGlobal).to.be.a('function');
    expect(Provider.getGlobal.length).to.equal(0);
  });

  it('should return global', (): void => {
    expect(Provider.getGlobal()).to.deep.equal(Provider.global);
  });
};
