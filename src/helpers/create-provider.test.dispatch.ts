import { expect } from 'chai';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });

  it('should be an object of functions', (): void => {
    expect(Provider.dispatch).to.be.an('object');
    for (const dispatcher of Object.values(Provider.dispatch)) {
      expect(dispatcher).to.be.a('function');
    }
  });

  it('should not have a setter', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.dispatch = true;
    }).to.throw();
  });

  it('should share keys with reducers', (): void => {
    const dispatchKeys = Object.keys(Provider.dispatch).sort();
    const reducerKeys = Object.keys(INITIAL_REDUCERS).sort();
    expect(dispatchKeys).to.deep.equal(reducerKeys);
  });

  it('should update when reducers update', (): void => {
    const REDUCER = (): void => {};
    const REDUCER_NAME = 'REDUCER_NAME';

    expect(Provider.dispatch[REDUCER_NAME]).to.be.undefined;
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(Provider.dispatch[REDUCER_NAME]).to.be.a('function');
  });
};
