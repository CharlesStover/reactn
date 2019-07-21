import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { hasContext } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';
import itShouldRequireContext from './utils/it-should-require-context';



describe('Provider.reset', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider;
  const spy = spyOn('reset');
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.reset).toBeInstanceOf(Function);
    expect(Provider.reset).toHaveLength(0);
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
