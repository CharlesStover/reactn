import GlobalStateManager from '../../src/global-state-manager';
import Reducer, { Dispatcher } from '../../src/typings/reducer';
import useGlobalReducer from '../../src/use-global-reducer';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { GS, INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ Reducer<GS, A> ];

type V = Dispatcher<GS, A>;



const ARGS: string[] = [ 'te', 'st' ];

const REDUCER: Reducer<GS, A> = INITIAL_REDUCERS.append;

const STATE_CHANGE: Partial<GS> =
  REDUCER(INITIAL_STATE, ...ARGS) as Partial<GS>;

const NEW_STATE: GS = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useGlobalReducer(Function)', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  let testUseGlobalReducer: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
    testUseGlobalReducer =
      new HookTest<P, V>(
        (reducer: Reducer<GS, A>): V =>
          useGlobalReducer(globalStateManager, reducer)
      );
  });



  it('should return a function', (): void => {
    testUseGlobalReducer.render(REDUCER);
    expect(testUseGlobalReducer.value).toBeInstanceOf(Function);
    expect(testUseGlobalReducer.value).toHaveLength(0);
  });



  describe('the returned function', (): void => {

    let reducer: Dispatcher<GS, A>;
    beforeEach((): void => {
      testUseGlobalReducer.render(REDUCER);
      reducer = testUseGlobalReducer.value;
    });

    it(
      'should return a Promise of the new global state',
      async (): Promise<void> => {
        const reduce: Promise<GS> = reducer(...ARGS);
        expect(reduce).toBeInstanceOf(Promise);
        const value: GS = await reduce;
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
