import GlobalStateManager from '../../src/global-state-manager';
import Dispatcher from '../../types/dispatcher';
import { D, G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = [ boolean, number, string ];



const NEW_STATE: Partial<G> = {
  x: true,
};

const REDUCER_ARGS: A = [ true, 1, 'str' ];

const REDUCER_NAME: string = 'REDUCER_NAME';

const REDUCER = (
  _state: G,
  _dispatch: D,
  _a: boolean,
  _b: number,
  _c: string,
): Partial<G> => NEW_STATE;



describe('GlobalStateManager.createDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 2 argument', (): void => {
    expect(globalStateManager.createDispatcher).toBeInstanceOf(Function);
    expect(globalStateManager.createDispatcher).toHaveLength(2);
  });



  describe('return value', (): void => {

    /**
     * Argument count is always 0, because the transpiler uses the arguments
     *   keyword instead of including them in the function definition.
     * There is no test for the argument count being 0, because if the
     *   transpiler refactors the arguments to be included in the function
     *   definition, that would still be correct behavior and should not break
     *   the build.
     */
    it('should be a function', (): void => {
      const dispatch: Dispatcher<G, A> =
        globalStateManager.createDispatcher(REDUCER, REDUCER_NAME);
      expect(dispatch).toBeInstanceOf(Function);
    });

    it('should auto-fill the global state argument', (): void => {

      const spy = jest.fn(REDUCER);
      const startState: G = globalStateManager.state;

      const dispatch: Dispatcher<G, A> =
        globalStateManager.createDispatcher(spy, REDUCER_NAME);

      dispatch(...REDUCER_ARGS);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        startState,
        globalStateManager.dispatchers,
        ...REDUCER_ARGS,
      );
    });

    const spy = spyOn('set');
    it('should call GlobalStateManager.set', (): void => {
      const dispatch: Dispatcher<G, A> =
        globalStateManager.createDispatcher(REDUCER, REDUCER_NAME);
      dispatch(...REDUCER_ARGS);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(
        NEW_STATE,
        REDUCER_NAME,
        REDUCER_ARGS,
      );
    });



    describe('return value', (): void => {

      let dispatch: Dispatcher<G, A>;
      beforeEach((): void => {
        dispatch = globalStateManager.createDispatcher(REDUCER, REDUCER_NAME);
      });

      it('should be a Promise', async (): Promise<void> => {
        const value = dispatch(...REDUCER_ARGS);
        expect(value).toBeInstanceOf(Promise);
        await value;
      });

      it('should resolve to the new global state', async (): Promise<void> => {
        const value: G = await dispatch(...REDUCER_ARGS);
        expect(value).toStrictEqual(globalStateManager.state);
      });
    });

  });

});
