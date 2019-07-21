import GlobalStateManager from '../../src/global-state-manager';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import Dispatcher from '../../types/dispatcher';
import Reducer from '../../types/reducer';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type AppendReducer = Reducer<G, {}, A, Partial<G>>;

type P = [ AppendReducer ];

type V = Dispatcher<G, A>;



const ARGS: string[] = [ 'te', 'st' ];

const REDUCER: AppendReducer = INITIAL_REDUCERS.append;

const STATE_CHANGE: Partial<G> =
  REDUCER(INITIAL_STATE, {}, ...ARGS) as Partial<G>;

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useDispatch(Function)', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      expect((): void => {
        useDispatch(globalStateManager, REDUCER);
      }).toThrowError(REACT_HOOKS_ERROR);
    });
    return;
  }



  const spy = spyOn('set');



  let testUseDispatch: HookTest<P, V>;
  beforeEach((): void => {
    testUseDispatch =
      new HookTest<P, V>(
        (reducer: AppendReducer): V =>
          useDispatch<G, {}, A>(globalStateManager, reducer),
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
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER.name, ARGS);
    });
  });

});
