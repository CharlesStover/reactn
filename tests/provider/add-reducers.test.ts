import createProvider, { ReactNProvider } from '../../src/create-provider';
import Reducer from '../../src/typings/reducer';
import { GS, INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const REDUCER_NAMES: string[] = Object.keys(INITIAL_REDUCERS);

const REDUCERS: [ string, Reducer<GS> ][] = Object.entries(INITIAL_REDUCERS);



describe('Provider.addReducers', (): void => {

  const spy = spyOn('addDispatcher', 'removeDispatcher');

  let Provider: ReactNProvider<GS>;
  beforeEach((): void => {
    Provider = createProvider<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 arguments', (): void => {
    expect(Provider.addReducers).toBeInstanceOf(Function);
    expect(Provider.addReducers).toHaveLength(1);
  });

  it(
    'should call GlobalStateManager.addDispatcher for each reducer',
    (): void => {
      Provider.addReducers(INITIAL_REDUCERS);
      expect(spy.addDispatcher).toHaveBeenCalledTimes(REDUCERS.length);
      for (const [ name, reducer ] of REDUCERS) {
        expect(spy.addDispatcher).toHaveBeenCalledWith(name, reducer);
      }
    }
  );



  describe('return remove reducers function', (): void => {

    let removeReducers: () => boolean;
    beforeEach((): void => {
      removeReducers = Provider.addReducers(INITIAL_REDUCERS);
    });



    it('should be a function with no arguments', (): void => {
      expect(removeReducers).toBeInstanceOf(Function);
      expect(removeReducers).toHaveLength(0);
    });

    it(
      'should call GlobalStateManager.removeDispatcher for each reducer',
      (): void => {
        removeReducers();
        expect(spy.removeDispatcher).toHaveBeenCalledTimes(REDUCER_NAMES.length);
        for (const reducerName of REDUCER_NAMES) {
          expect(spy.removeDispatcher).toHaveBeenCalledWith(reducerName);
        }
      }
    );

    it('should return true', (): void => {
      expect(removeReducers()).toBe(true);
    });
  });

});
