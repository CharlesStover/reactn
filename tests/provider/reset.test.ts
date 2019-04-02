import { expect } from 'chai';
import createProvider, { ReactNProvider } from '../../src/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



describe('Provider.reset', (): void => {

  let Provider: ReactNProvider;
  const spy = spyOn('reset');
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.reset).to.be.a('function');
    expect(Provider.reset.length).to.equal(0);
  });

  it('should call GlobalStateManager.reset', (): void => {
    Provider.reset();
    expect(spy.reset.calledOnceWithExactly()).to.equal(true);
  });

  it('should return undefined', (): void => {
    expect(Provider.reset()).to.be.undefined;
  });
});
