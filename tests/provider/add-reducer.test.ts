import createProvider, { ReactNProvider } from '../../src/create-provider';
import spyOn from '../utils/spy-on-global-state-manager';



const REDUCER = (): void => {};

const REDUCER_NAME = 'REDUCER_NAME';



describe('Provider.addReducer', (): void => {

  const spy = spyOn('addDispatcher', 'removeDispatcher');

  let Provider: ReactNProvider<{}>;
  beforeEach((): void => {
    Provider = createProvider();
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.addReducer).toEqual(expect.any(Function));;
    expect(Provider.addReducer.length).toBe(2);
  });

  it('should call GlobalStateManager.addDispatcher', (): void => {
    Provider.addReducer(REDUCER_NAME, REDUCER);
    expect(spy.addDispatcher).toHaveBeenCalledTimes(1);
    expect(spy.addDispatcher).toHaveBeenCalledWith(REDUCER_NAME, REDUCER);
  });



  describe('return value', (): void => {

    let removeReducer: () => boolean;
    beforeEach((): void => {
      removeReducer = Provider.addReducer(REDUCER_NAME, REDUCER);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeReducer).toEqual(expect.any(Function));;
      expect(removeReducer.length).toBe(0);
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
