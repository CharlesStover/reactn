import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.useGlobal', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.useGlobal).toBeInstanceOf(Function);
    expect(Provider.useGlobal).toHaveLength(1);
  });

  it.skip('should call the useGlobal helper function', (): void => {
  });
});
