import GlobalStateManager from '../../src/global-state-manager';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import Dispatcher, { ExtractArguments } from '../../types/dispatcher';
import Dispatchers from '../../types/dispatchers';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = ExtractArguments<R[typeof REDUCER]>;

type P = [ ];

type V = Dispatchers<G, R>;



const ARGS: A = [ 'te', 'st' ];

const REDUCER: keyof R = 'append';

const REDUCER_NAMES: string[] = Object.keys(INITIAL_REDUCERS);

const STATE_CHANGE: Partial<G> = INITIAL_REDUCERS[REDUCER](
  INITIAL_STATE,
  null,
  ...ARGS,
);

REDUCER_NAMES.sort();



describe('useDispatch()', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('dispatchers', 'set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
    testUseDispatch =
      new HookTest<P, V>(
        (): V => useDispatch(globalStateManager),
      );
  });



  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      testUseDispatch.render();
      expect(testUseDispatch.error).toBe(REACT_HOOKS_ERROR);
    });
    return;
  }



  it('should call GlobalStateManager.dispatchers', (): void => {
    testUseDispatch.render();
    expect(spy.dispatchers).toHaveBeenCalledTimes(1);
  });

  it('should return an object of dispatchers', (): void => {
    testUseDispatch.render();
    expect(typeof testUseDispatch.value).toEqual('object');
    const DISPATCHER_NAMES: string[] = Object.keys(testUseDispatch.value);
    DISPATCHER_NAMES.sort();
    expect(DISPATCHER_NAMES).toEqual(REDUCER_NAMES);
  });



  describe('the returned dispatch object values', (): void => {

    let dispatch: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseDispatch.render();
      dispatch = testUseDispatch.value[REDUCER];
    });

    it('should be the dispatcher', (): void => {
      expect(dispatch).toBe(globalStateManager.getDispatcher(REDUCER));
    });

    it('should call GlobalStateManager.set', async (): Promise<void> => {
      await dispatch(...ARGS);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER, ARGS);
    });
  });

});
