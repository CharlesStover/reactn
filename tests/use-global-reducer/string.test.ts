import GlobalStateManager from '../../src/global-state-manager';
import { Dispatcher } from '../../src/typings/reducer';
import useGlobalReducer from '../../src/use-global-reducer';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ keyof R ];

type V = Dispatcher<G, A>;



const REDUCER: keyof R = 'append';



describe('useGlobalReducer(string)', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  let testUseGlobalReducer: HookTest<P, V>;
  const spy = spyOn('getDispatcher', 'set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
    testUseGlobalReducer =
      new HookTest<P, V>(
        (name: keyof R): V => useGlobalReducer(globalStateManager, name)
      );
  });



  it('should call GlobalStateManager.getDispatcher', (): void => {
    testUseGlobalReducer.render(REDUCER);
    expect(spy.getDispatcher).toHaveBeenCalledTimes(1);
    expect(spy.getDispatcher).toHaveBeenCalledWith(REDUCER);
  });

  it('should return a function if the reducer exists', (): void => {
    testUseGlobalReducer.render(REDUCER);
    expect(testUseGlobalReducer.value).toBeInstanceOf(Function);
    expect(testUseGlobalReducer.value).toHaveLength(0);
  });

  it('should throw an error if the reducer does not exist', (): void => {

    // @ts-ignore: Deliberately throwing an error.
    testUseGlobalReducer.render('abc');
    expect(testUseGlobalReducer.error).toBeInstanceOf(Error);
  });



  describe('the returned function', (): void => {

    let reducer: Dispatcher<G, A>;
    beforeEach((): void => {
      testUseGlobalReducer.render(REDUCER);
      reducer = testUseGlobalReducer.value;
    });

    it('should be the dispatcher', (): void => {
      expect(reducer).toBe(globalStateManager.getDispatcher(REDUCER));
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
