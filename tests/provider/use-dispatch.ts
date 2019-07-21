import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import itShouldRequireContext from './utils/it-should-require-context';



describe('Provider.useDispatch', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.useDispatch).toBeInstanceOf(Function);
    expect(Provider.useDispatch).toHaveLength(2);
  });

  it.skip('should call the useDispatch helper function', (): void => {
  });
});
