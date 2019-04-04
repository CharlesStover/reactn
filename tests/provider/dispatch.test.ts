import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.dispatch', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be an object of functions', (): void => {
    expect(Provider.dispatch).toEqual(expect.any(Object));
    for (const dispatcher of Object.values(Provider.dispatch)) {
      expect(dispatcher).toEqual(expect.any(Function));;
    }
  });

  it('should not have a setter', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.dispatch = true;
    }).toThrow();
  });

  it('should share keys with reducers', (): void => {
    const dispatchKeys = Object.keys(Provider.dispatch).sort();
    const reducerKeys = Object.keys(INITIAL_REDUCERS).sort();
    expect(dispatchKeys).toEqual(reducerKeys);
  });

  it('should update when reducers update', (): void => {
    const REDUCER = (): void => {};
    const REDUCER_NAME = 'REDUCER_NAME';

    expect(Provider.dispatch[REDUCER_NAME]).toBeUndefined();
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(Provider.dispatch[REDUCER_NAME]).toEqual(expect.any(Function));;
  });
});
