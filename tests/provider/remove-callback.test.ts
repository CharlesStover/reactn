import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import spyOn from '../utils/spy-on-global-state-manager';



const CALLBACK = (): void => { };



describe('Provider.removeCallback', (): void => {

  let Provider: ReactNProvider;
  const spy = spyOn('removeCallback');
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with 1 argument', (): void => {
    expect(Provider.removeCallback).toBeInstanceOf(Function);
    expect(Provider.removeCallback).toHaveLength(1);
  });

  it('should call GlobalStateManager.removeCallback', () => {
    Provider.removeCallback(CALLBACK);
    expect(spy.removeCallback).toHaveBeenCalledTimes(1);
    expect(spy.removeCallback).toHaveBeenCalledWith(CALLBACK);
  });

  it('should return true if the callback existed', (): void => {
    Provider.addCallback(CALLBACK);
    expect(Provider.removeCallback(CALLBACK)).toBe(true);
  });

  it('should return false if the callback did not exist', (): void => {
    expect(Provider.removeCallback(CALLBACK)).toBe(false);
  });
});
