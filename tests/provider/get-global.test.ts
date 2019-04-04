import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_STATE } from '../utils/initial';



describe('Provider.getGlobal', (): void => {

  let Provider: ReactNProvider<GS>;
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
