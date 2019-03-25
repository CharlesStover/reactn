import { expect } from 'chai';
import spyOn from '../utils/test/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';

const CALLBACK = (): void => { };

export default (): void => {

  const spy = spyOn('addCallback', 'removeCallback');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });

  it('should be a function', (): void => {
    expect(Provider.addCallback).to.be.a('function');
  });

  it('should accept 1 parameter', (): void => {
    expect(Provider.addCallback.length).to.equal(1);
  });

  it('should call GlobalStateManager.addCallback', (): void => {
    Provider.addCallback(CALLBACK);
    expect(spy.addCallback.calledOnceWithExactly(CALLBACK)).to.equal(true);
  });

  describe('return value', (): void => {

    let removeCallback: () => boolean;

    beforeEach((): void => {
      removeCallback = Provider.addCallback(CALLBACK);
    });

    it('should be a function', (): void => {
      expect(removeCallback).to.be.a('function');
    });

    it('should accept no parameters', (): void => {
      expect(removeCallback.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeCallback', (): void => {
      removeCallback();
      expect(spy.removeCallback.calledOnceWithExactly(CALLBACK))
        .to.equal(true);
    });

    it('should return true', (): void => {
      expect(removeCallback()).to.equal(true);
    });
  });
};
