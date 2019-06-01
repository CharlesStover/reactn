import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.withGlobal', (): void => {

  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.withGlobal).toBeInstanceOf(Function);
    expect(Provider.withGlobal).toHaveLength(2);
  });

  it.skip('should do more', (): void => {
  });
});
