import { expect } from 'chai';
import createProvider, { ReactNProvider } from '../../src/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



const CALLBACK = (): void => { };



describe('Provider.removeCallback', (): void => {

  let Provider: ReactNProvider;
  const spy = spyOn('removeCallback');
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with 1 argument', (): void => {
    expect(Provider.removeCallback).to.be.a('function');
    expect(Provider.removeCallback.length).to.equal(1);
  });

  it('should call GlobalStateManager.removeCallback', () => {
    Provider.removeCallback(CALLBACK);
    expect(spy.removeCallback.calledOnceWith(CALLBACK)).to.equal(true);
  });

  it('should return true if the callback existed', (): void => {
    Provider.addCallback(CALLBACK);
    expect(Provider.removeCallback(CALLBACK)).to.equal(true);
  });

  it('should return false if the callback did not exist', (): void => {
    expect(Provider.removeCallback(CALLBACK)).to.equal(false);
  });
});
