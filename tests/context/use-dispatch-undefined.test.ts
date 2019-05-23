import ReactN = require('../../src/index');
import createProvider, { ReactNProvider } from '../../src/create-provider';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import Dispatcher, { ExtractArguments } from '../../typings/dispatcher';
import Dispatchers from '../../typings/dispatchers';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = ExtractArguments<R[typeof REDUCER]>;

type P = [ ];

type V = Dispatchers<G, R>;



const ARGS: A = [ 'te', 'st' ];

const EMPTY_STATE: {} = Object.create(null);

const Provider: ReactNProvider<G, R> = createProvider<G, R>(
  INITIAL_STATE,
  INITIAL_REDUCERS,
);

const REDUCER: keyof R = 'append';

const REDUCER_NAMES: string[] = Object.keys(INITIAL_REDUCERS);

const STATE_CHANGE: Partial<G> = INITIAL_REDUCERS[REDUCER](
  INITIAL_STATE,
  Provider.dispatch,
  ...ARGS,
);

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};

REDUCER_NAMES.sort();



describe('Context useDispatch()', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    return;
  }

  let dispatchers: Dispatchers<G, R>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('set');

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


  it('should return an object', (): void => {
    expect(typeof dispatchers).toBe('object');
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
