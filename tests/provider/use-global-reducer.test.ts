import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.useGlobal', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 1 arguments', (): void => {
    expect(Provider.useGlobalReducer).toBeInstanceOf(Function);
    expect(Provider.useGlobalReducer).toHaveLength(1);
  });

  it.skip('should call the useGlobalReducer helper function', (): void => {
  });
});
