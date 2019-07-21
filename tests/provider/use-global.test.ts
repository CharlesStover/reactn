import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import itShouldRequireContext from './utils/it-should-require-context';



describe('Provider.useGlobal', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 1 arguments', (): void => {
    expect(Provider.useGlobal).toBeInstanceOf(Function);
    expect(Provider.useGlobal).toHaveLength(1);
  });

  it.skip('should call the useGlobal helper function', (): void => {
  });
});
