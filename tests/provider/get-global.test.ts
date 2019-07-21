import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_STATE } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import itShouldRequireContext from './utils/it-should-require-context';



describe('Provider.getGlobal', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE);
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.getGlobal).toBeInstanceOf(Function);
    expect(Provider.getGlobal).toHaveLength(0);
  });

  it('should return global', (): void => {
    expect(Provider.getGlobal()).toStrictEqual(Provider.global);
  });
});
