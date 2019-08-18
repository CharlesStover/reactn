import ReactN = require('../../src/index');
import createProvider from '../../src/create-provider';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import Dispatcher, { ExtractArguments } from '../../types/dispatcher';
import DispatchFunction from '../../types/dispatch-function';
import Dispatchers from '../../types/dispatchers';
import ReactNProvider from '../../types/provider';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = ExtractArguments<R[typeof REDUCER]>;

type P = [ ];

type V = DispatchFunction<G> & Dispatchers<G, R>;



const ARGS: A = [ 'te', 'st' ];

const EMPTY_STATE: {} = Object.create(null);

const REDUCER: keyof R = 'append';

const REDUCER_NAMES: string[] = Object.keys(INITIAL_REDUCERS);

REDUCER_NAMES.sort();



describe('Context useDispatch()', (): void => {

  // If Context is not supported,
  if (!hasHooks) {
    it.todo('should require hooks');
    return;
  }



  const Provider: ReactNProvider<G, R> = createProvider<G, R>(
    INITIAL_STATE,
    INITIAL_REDUCERS,
  );

  const spy = spyOn('set');
  
  const STATE_CHANGE: Partial<G> = INITIAL_REDUCERS[REDUCER](
    INITIAL_STATE,
    Provider.dispatcherMap,
    ...ARGS,
  );

  const NEW_STATE: G = {
    ...INITIAL_STATE,
    ...STATE_CHANGE,
  };



  let dispatchers: Dispatchers<G, R>;
  let testUseDispatch: HookTest<P, V>;
  beforeEach((): void => {
    testUseDispatch =
      new HookTest<P, V>(
        (): V => ReactN.useDispatch<G, R>()
      )
        .addParent(Provider);
    testUseDispatch.render();
    dispatchers = testUseDispatch.value;
  });

  afterEach((): void => {
    Provider.reset();
  });


  it('should return a function', (): void => {
    expect(dispatchers).toBeInstanceOf(Function);
  });

  it('should return the global dispatch object', async (): Promise<void> => {
    const DISPATCHER_NAMES: string[] = Object.keys(dispatchers);
    DISPATCHER_NAMES.sort();
    expect(DISPATCHER_NAMES).toEqual(REDUCER_NAMES);
  });

  describe('the returned dispatch object values', (): void => {

    let dispatch: Dispatcher<G, A>;
    beforeEach((): void => {
      dispatch = dispatchers[REDUCER];
    });

    it('should call GlobalStateManager.set', async (): Promise<void> => {
      await dispatch(...ARGS);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER, ARGS);
    });
  
    it('should update the Context global state', async (): Promise<void> => {
      await dispatch(...ARGS);
      expect(Provider.global).toEqual(NEW_STATE);
    });
  
    it('should not update the default global state', async (): Promise<void> => {
      await dispatch(...ARGS);
      expect(defaultGlobalStateManager.state).toStrictEqual(EMPTY_STATE);
    });
  });

});
