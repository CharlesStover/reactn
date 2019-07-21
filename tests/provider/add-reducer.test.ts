import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { hasContext } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';
import itShouldRequireContext from './utils/it-should-require-context';



const REDUCER = (): void => {};

const REDUCER_NAME = 'REDUCER_NAME';



describe('Provider.addReducer', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  const spy = spyOn('addReducer', 'removeDispatcher');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.addReducer).toBeInstanceOf(Function);
    expect(Provider.addReducer).toHaveLength(2);
  });

  it('should call GlobalStateManager.addReducer', (): void => {
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(spy.addReducer).toHaveBeenCalledTimes(1);
    expect(spy.addReducer).toHaveBeenCalledWith(REDUCER_NAME, REDUCER);
  });



  describe('return value', (): void => {

    let removeReducer: () => boolean;
    beforeEach((): void => {
      removeReducer = Provider.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeReducer).toBeInstanceOf(Function);
      expect(removeReducer).toHaveLength(0);
    });

    it('should call GlobalStateManager.removeDispatcher', (): void => {
      removeReducer();
      expect(spy.removeDispatcher).toHaveBeenCalledTimes(1);
      expect(spy.removeDispatcher).toHaveBeenCalledWith(REDUCER_NAME);
    });

    it('should return true', (): void => {
      expect(removeReducer()).toBe(true);
    });
  });

});
