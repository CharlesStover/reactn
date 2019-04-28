import GlobalStateManager from '../../src/global-state-manager';
import { Dispatcher } from '../../src/typings/reducer';
import { G, INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



describe('GlobalStateManager.createDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.createDispatcher).toBeInstanceOf(Function);
    expect(globalStateManager.createDispatcher).toHaveLength(1);
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
      const dispatch: Dispatcher<G, []> =
        globalStateManager.createDispatcher(INITIAL_REDUCERS.reset);
      expect(dispatch).toBeInstanceOf(Function);
    });

    it('should auto-fill the global state argument', (): void => {

      const REDUCER_WITH_ARGS =
        (_gs: G, _1: boolean, _2: number): null => null;
      const spy = jest.fn(REDUCER_WITH_ARGS);

      const dispatch: Dispatcher<G, [ boolean, number ]> =
        globalStateManager.createDispatcher(spy);
      dispatch(true, 1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(globalStateManager.state, true, 1);
    });

    const spy = spyOn('set');
    it('should call GlobalStateManager.set', (): void => {
      const NEW_STATE: Partial<G> = {
        x: true,
      };
      const REDUCER = (): Partial<G> => NEW_STATE;
      const dispatch: Dispatcher<G, []> =
        globalStateManager.createDispatcher(REDUCER);
      dispatch();
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(NEW_STATE);
    });



    describe('return value', (): void => {

      const REDUCER = (): G => ({
        x: true,
        y: 1,
        z: 'any',
      });

      let dispatch: Dispatcher<G, []>;
      beforeEach((): void => {
        dispatch = globalStateManager.createDispatcher(REDUCER);
      });

      it('should be a Promise', async (): Promise<void> => {
        const value = dispatch();
        expect(value).toBeInstanceOf(Promise);
        await value;
      });

      it('should resolve to the new global state', async (): Promise<void> => {
        const value: G = await dispatch();
        expect(value).toStrictEqual(globalStateManager.state);
      });
    });

  });

});
