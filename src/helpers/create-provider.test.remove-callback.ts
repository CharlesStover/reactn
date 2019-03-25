import { expect } from 'chai';
import spyOn from '../utils/test/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';



const CALLBACK = (): void => { };



export default (): void => {

  let Provider: ReactNProvider;
  const spy = spyOn('removeCallback');
  beforeEach((): void => {
    Provider = createProvider();
  });

  it('should be a function', (): void => {
    expect(Provider.removeCallback).to.be.a('function');
  });

  it('should accept 1 parameter', (): void => {
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
};
