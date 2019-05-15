import addReducer from '../src/add-reducer';
import getDispatch from '../src/get-dispatch';
import GlobalStateManager from '../src/global-state-manager';
import { Dispatchers } from '../src/typings/reducer';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const REDUCER_NAMES: string[] = Object.keys(INITIAL_REDUCERS);



describe('getDispatch', (): void => {

  let dispatchers: Dispatchers<G, R>;
  let globalStateManager: GlobalStateManager<G, R>;
  const spy = spyOn('dispatchers');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
    dispatchers = getDispatch<G, R>(globalStateManager);
  });



  it('should be a function with 1 argument', (): void => {
    expect(getDispatch).toBeInstanceOf(Function);
    expect(getDispatch).toHaveLength(1);
  });

  it('should call GlobalStateManager.dispatchers', (): void => {
    expect(spy.dispatchers).toHaveBeenCalledTimes(1);
    expect(spy.dispatchers).toHaveBeenCalledWith();
  });

  it('should be an object of functions', (): void => {
    // Provider.dispatch extends Object.create(null), so it has no prototype.
    expect(dispatchers).toEqual(expect.any(Object));
    for (const dispatcher of Object.values(dispatchers)) {
      expect(dispatcher).toBeInstanceOf(Function);
    }
  });

  it('should share keys with reducers', (): void => {
    const DISPATCHER_NAMES: string[] = Object.keys(dispatchers);
    DISPATCHER_NAMES.sort();
    expect(DISPATCHER_NAMES).toStrictEqual(REDUCER_NAMES);
  });

  it('should update when reducers update', (): void => {
    const REDUCER = (): void => { };
    const REDUCER_NAME = 'REDUCER_NAME';

    expect(dispatchers[REDUCER_NAME]).toBeUndefined();
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    dispatchers = getDispatch(globalStateManager);
    expect(dispatchers[REDUCER_NAME]).toBeInstanceOf(Function);
  });
});
