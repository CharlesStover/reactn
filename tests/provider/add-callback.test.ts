import { expect } from 'chai';
import createProvider, {
  ReactNProvider,
} from '../../src/helpers/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



const CALLBACK = (): void => { };



describe('Provider.addCallback', (): void => {

  const spy = spyOn('addCallback', 'removeCallback');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });

  it('should be a function with 1 argument', (): void => {
    expect(Provider.addCallback).to.be.a('function');
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

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).to.be.a('function');
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
});
