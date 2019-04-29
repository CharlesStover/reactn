import GlobalStateManager from '../../src/global-state-manager';
import Reducer, { Dispatcher } from '../../src/typings/reducer';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ Reducer<G, R, A> ];

type V = Dispatcher<G, A>;



const ARGS: string[] = [ 'te', 'st' ];

const REDUCER: Reducer<G, R, A> = INITIAL_REDUCERS.append;

const STATE_CHANGE: Partial<G> =
  REDUCER(INITIAL_STATE, INITIAL_REDUCERS, ...ARGS) as Partial<G>;

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useDispatch(Function)', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
    testUseDispatch =
      new HookTest<P, V>(
        (reducer: Reducer<G, R, A>): V =>
          useDispatch<G, R, A>(globalStateManager, reducer),
      );
  });



  it('should return a function', (): void => {
    testUseDispatch.render(REDUCER);
    expect(testUseDispatch.value).toBeInstanceOf(Function);
    expect(testUseDispatch.value).toHaveLength(0);
  });



  describe('the returned function', (): void => {

    let reducer: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseDispatch.render(REDUCER);
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
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
    });
  });



  describe('React Hooks', (): void => {
    deleteHooks();

    it('should be required', (): void => {
      testUseDispatch.render(REDUCER);
      expect(testUseDispatch.error).toBe(REACT_HOOKS_ERROR);
    });
  });

});
