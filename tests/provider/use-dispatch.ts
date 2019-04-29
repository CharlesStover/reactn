import createProvider, { ReactNProvider } from '../../src/create-provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.useDispatch', (): void => {

  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 1 arguments', (): void => {
    expect(Provider.useDispatch).toBeInstanceOf(Function);
    expect(Provider.useDispatch).toHaveLength(1);
  });

  it.skip('should call the useDispatch helper function', (): void => {
  });
});
