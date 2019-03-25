import { expect } from 'chai';
import spyOn from '../utils/test/spy-on-global-state-manager';
import createProvider, { ReactNProvider } from './create-provider';

const CALLBACK = (): void => {};

export default () => {

  const spy = spyOn('addCallback', 'removeCallback');

  let Provider: ReactNProvider<{}>;
  beforeEach(() => {
    Provider = createProvider();
  });

  it('should be a function', () => {
    expect(Provider.addCallback).to.be.a('function');
  });

  it('should accept 1 parameter', () => {
    expect(Provider.addCallback.length).to.equal(1);
  });

  it('should call GlobalStateManager.addCallback', () => {
    Provider.addCallback(CALLBACK);
    expect(spy.addCallback.calledOnceWithExactly(CALLBACK)).to.equal(true);
  });

  describe('return value', () => {

    let removeCallback: () => boolean;

    beforeEach(() => {
      removeCallback = Provider.addCallback(CALLBACK);
    });

    it('should be a function', () => {
      expect(removeCallback).to.be.a('function');
    });

    it('should accept no parameters', () => {
      expect(removeCallback.length).to.equal(0);
    });

    it('should call GlobalStateManager.removeCallback', () => {
      removeCallback();
      expect(spy.removeCallback.calledOnceWithExactly(CALLBACK))
        .to.equal(true);
    });

    it('should return true', () => {
      expect(removeCallback()).to.equal(true);
    });
  });
};
