import createProvider, { ReactNProvider } from '../../src/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



const CALLBACK = (): void => { };



describe('Provider.addCallback', (): void => {

  const spy = spyOn('addCallback', 'removeCallback');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });

  it('should be a function with 1 argument', (): void => {
    expect(Provider.addCallback).toEqual(expect.any(Function));;
    expect(Provider.addCallback.length).toBe(1);
  });

  it('should call GlobalStateManager.addCallback', (): void => {
    Provider.addCallback(CALLBACK);
    expect(spy.addCallback).toHaveBeenCalledTimes(1);
    expect(spy.addCallback).toHaveBeenCalledWith(CALLBACK);
  });

  describe('return value', (): void => {

    let removeCallback: () => boolean;

    beforeEach((): void => {
      removeCallback = Provider.addCallback(CALLBACK);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeCallback).toEqual(expect.any(Function));;
      expect(removeCallback.length).toBe(0);
    });

    it('should call GlobalStateManager.removeCallback', (): void => {
      removeCallback();
      expect(spy.removeCallback).toHaveBeenCalledTimes(1);
      expect(spy.removeCallback).toHaveBeenCalledWith(CALLBACK);
    });

    it('should return true', (): void => {
      expect(removeCallback()).toBe(true);
    });
  });
});
