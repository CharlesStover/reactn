import GlobalStateManager from '../../src/global-state-manager';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import Dispatcher from '../../types/dispatcher';
import Dispatchers from '../../types/dispatchers';
import { PropertyReducer } from '../../types/reducer';
import HookTest from '../utils/hook-test';
import { G, INITIAL_STATE } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ ZReducer, keyof G ];

type V = Dispatcher<G, A>;

type ZReducer = PropertyReducer<G, {}, string[], 'z'>;



const ARGS: string[] = [ 'te', 'st' ];

const REDUCER: ZReducer =
  (global: G, _dispatch: Dispatchers<G, {}>, ...args: string[]): G['z'] =>
    global.z + args.join('');

const STATE_CHANGE: Partial<G> = {
  z: REDUCER(INITIAL_STATE, {}, ...ARGS),
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useDispatch(Function, keyof State)', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
    testUseDispatch =
      new HookTest<P, V>(
        (reducer: ZReducer, property: keyof G): V =>
          useDispatch<G, {}, A>(globalStateManager, reducer, property),
      );
  });


  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      testUseDispatch.render(REDUCER, 'z');
      expect(testUseDispatch.error).toBe(REACT_HOOKS_ERROR);
    });
    return;
  }



  it('should return a function', (): void => {
    testUseDispatch.render(REDUCER, 'z');
    expect(testUseDispatch.value).toBeInstanceOf(Function);
    expect(testUseDispatch.value).toHaveLength(0);
  });



  describe('the returned function (with a property)', (): void => {

    let reducer: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseDispatch.render(REDUCER, 'z');
      reducer = testUseDispatch.value;
    });

    it(
      'should return a Promise of the new global state',
      async (): Promise<void> => {
        const reduce: Promise<G> = reducer(...ARGS);
        expect(reduce).toBeInstanceOf(Promise);
        const value: G = await reduce;
        expect(value).toEqual(NEW_STATE);
      }
    );

    it('should call GlobalStateManager.set', async (): Promise<void> => {
      await reducer(...ARGS);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER.name, ARGS);
    });
  });

});
