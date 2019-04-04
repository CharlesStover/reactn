import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.getDispatch', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.getDispatch).toEqual(expect.any(Function));;
    expect(Provider.getDispatch.length).toBe(0);
  });

  it('should return dispatch', (): void => {
    expect(Provider.getDispatch()).toEqual(Provider.dispatch);
  });
});
