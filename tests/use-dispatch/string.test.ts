import GlobalStateManager from '../../src/global-state-manager';
import { Dispatcher } from '../../src/typings/reducer';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ keyof R ];

type V = Dispatcher<G, A>;



const REDUCER: keyof R = 'append';



describe('useDispatch(string)', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('getDispatcher', 'set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
    testUseDispatch =
      new HookTest<P, V>(
        (name: keyof R): V => useDispatch(globalStateManager, name)
      );
  });



  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      testUseDispatch.render(REDUCER);
      expect(testUseDispatch.error).toBe(REACT_HOOKS_ERROR);
    });
    return;
  }



  it('should call GlobalStateManager.getDispatcher', (): void => {
    testUseDispatch.render(REDUCER);
    expect(spy.getDispatcher).toHaveBeenCalledTimes(1);
    expect(spy.getDispatcher).toHaveBeenCalledWith(REDUCER);
  });

  it('should return a function if the reducer exists', (): void => {
    testUseDispatch.render(REDUCER);
    expect(testUseDispatch.value).toBeInstanceOf(Function);
    expect(testUseDispatch.value).toHaveLength(0);
  });

  it('should throw an error if the reducer does not exist', (): void => {

    // @ts-ignore: Deliberately throwing an error.
    testUseDispatch.render('abc');
    expect(testUseDispatch.error).toBeInstanceOf(Error);
  });



  describe('the returned function', (): void => {

    let reducer: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseDispatch.render(REDUCER);
      reducer = testUseDispatch.value;
    });

    it('should be the dispatcher', (): void => {
      expect(reducer).toBe(globalStateManager.getDispatcher(REDUCER));
    });
  });

});
