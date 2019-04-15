import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.getDispatch', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.getDispatch).toBeInstanceOf(Function);
    expect(Provider.getDispatch).toHaveLength(0);
  });

  it('should return dispatch', (): void => {
    expect(Provider.getDispatch()).toStrictEqual(Provider.dispatch);
  });
});
