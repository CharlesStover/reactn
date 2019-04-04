import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



const INITIAL_REDUCERS_KEYS: string[] = Object.keys(INITIAL_REDUCERS);

INITIAL_REDUCERS_KEYS.sort();



describe('Provider.dispatch', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be an object of functions', (): void => {
    // Provider.dispatch extends Object.create(null), so it has no prototype.
    expect(Provider.dispatch).toEqual(expect.any(Object));
    for (const dispatcher of Object.values(Provider.dispatch)) {
      expect(dispatcher).toBeInstanceOf(Function);
    }
  });

  it('should not have a setter', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.dispatch = true;
    }).toThrow();
  });

  it('should share keys with reducers', (): void => {
    const dispatchKeys: string[] = Object.keys(Provider.dispatch);
    dispatchKeys.sort();
    expect(dispatchKeys).toStrictEqual(INITIAL_REDUCERS_KEYS);
  });

  it('should update when reducers update', (): void => {
    const REDUCER = (): void => { };
    const REDUCER_NAME = 'REDUCER_NAME';

    expect(Provider.dispatch[REDUCER_NAME]).toBeUndefined();
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(Provider.dispatch[REDUCER_NAME]).toBeInstanceOf(Function);
  });
});
