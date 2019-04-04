import createProvider, { ReactNProvider } from '../../src/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



describe('Provider.reset', (): void => {

  let Provider: ReactNProvider;
  const spy = spyOn('reset');
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.reset).toEqual(expect.any(Function));;
    expect(Provider.reset.length).toBe(0);
  });

  it('should call GlobalStateManager.reset', (): void => {
    Provider.reset();
    expect(spy.reset).toHaveBeenCalledTimes(1);
    expect(spy.reset).toHaveBeenCalledWith();
  });

  it('should return undefined', (): void => {
    expect(Provider.reset()).toBeUndefined();
  });
});
