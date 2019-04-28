import GlobalStateManager from '../../src/global-state-manager';
import Reducer, { Dispatcher } from '../../src/typings/reducer';
import useGlobalReducer from '../../src/use-global-reducer';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ Reducer<G, A> ];

type V = Dispatcher<G, A>;



const ARGS: string[] = [ 'te', 'st' ];

const REDUCER: Reducer<G, A> = INITIAL_REDUCERS.append;

const STATE_CHANGE: Partial<G> =
  REDUCER(INITIAL_STATE, ...ARGS) as Partial<G>;

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useGlobalReducer(Function)', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  let testUseGlobalReducer: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
    testUseGlobalReducer =
      new HookTest<P, V>(
        (reducer: Reducer<G, A>): V =>
          useGlobalReducer(globalStateManager, reducer)
      );
  });



  it('should return a function', (): void => {
    testUseGlobalReducer.render(REDUCER);
    expect(testUseGlobalReducer.value).toBeInstanceOf(Function);
    expect(testUseGlobalReducer.value).toHaveLength(0);
  });



  describe('the returned function', (): void => {

    let reducer: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseGlobalReducer.render(REDUCER);
      reducer = testUseGlobalReducer.value;
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
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
    });
  });



  describe('React Hooks', (): void => {
    deleteHooks();

    it('should be required', (): void => {
      testUseGlobalReducer.render(REDUCER);
      expect(testUseGlobalReducer.error).toBe(REACT_HOOKS_ERROR);
    });
  });

});
