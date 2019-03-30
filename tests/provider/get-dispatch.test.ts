import { expect } from 'chai';
import createProvider, {
  ReactNProvider,
} from '../../src/helpers/create-provider';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('Provider.getDispatch', (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with no arguments', (): void => {
    expect(Provider.getDispatch).to.be.a('function');
    expect(Provider.getDispatch.length).to.equal(0);
  });

  it('should return dispatch', (): void => {
    expect(Provider.getDispatch()).to.deep.equal(Provider.dispatch);
  });
});
