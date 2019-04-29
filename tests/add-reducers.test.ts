import addReducers from '../src/add-reducers';
import GlobalStateManager from '../src/global-state-manager';
import { G, INITIAL_REDUCERS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const REDUCER_NAMES = Object.keys(INITIAL_REDUCERS);

const REDUCERS = Object.entries(INITIAL_REDUCERS);



describe('addReducers', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('addReducer', 'removeDispatcher');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(addReducers).toBeInstanceOf(Function);
    expect(addReducers).toHaveLength(2);
  });

  it(
    'should call GlobalStateManager.addReducer for each reducer',
    (): void => {
      addReducers(globalStateManager, INITIAL_REDUCERS);
      expect(spy.addReducer).toHaveBeenCalledTimes(REDUCERS.length);
      for (const [ name, reducer ] of REDUCERS) {
        expect(spy.addReducer).toHaveBeenCalledWith(name, reducer);
      }
    }
  );



  describe('returned remove reducers function', (): void => {

    let removeReducers: () => boolean;
    beforeEach((): void => {
      removeReducers = addReducers(globalStateManager, INITIAL_REDUCERS);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeReducers).toBeInstanceOf(Function);
      expect(removeReducers).toHaveLength(0);
    });

    it(
      'should call GlobalStateManager.removeDispatcher for each reducer',
      (): void => {
        removeReducers();
        expect(spy.removeDispatcher).toHaveBeenCalledTimes(REDUCERS.length);
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
