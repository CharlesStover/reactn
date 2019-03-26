import { expect } from 'chai';
import sinon from 'sinon';
import GlobalStateManager from './global-state-manager';
import { Dispatcher } from './typings/reducer';
import { GS, INITIAL_REDUCERS, INITIAL_STATE } from './utils/test/initial';
import spyOn from './utils/test/spy-on-global-state-manager';



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.createDispatcher).to.be.a('function');
    expect(globalStateManager.createDispatcher.length).to.equal(1);
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
      const dispatch: Dispatcher<typeof INITIAL_REDUCERS.reset> =
        globalStateManager.createDispatcher(INITIAL_REDUCERS.reset);
      expect(dispatch).to.be.a('function');
    });

    it('should auto-fill the global state argument', (): void => {

      const REDUCER_WITH_ARGS =
        (_gs: GS, _1: boolean, _2: number): null => null;
      const spy: sinon.SinonSpy = sinon.spy(REDUCER_WITH_ARGS);

      const dispatch: Dispatcher<typeof REDUCER_WITH_ARGS> =
        globalStateManager.createDispatcher(spy);
      dispatch(true, 1);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.args[0][0]).to.deep.equal(globalStateManager.state);
      expect(spy.args[0][1]).to.equal(true);
      expect(spy.args[0][2]).to.equal(1);
      expect(spy.args[0][3]).to.be.undefined;
    });

    const spy = spyOn('set');
    it('should call GlobalStateManager.set', (): void => {
      const NEW_STATE: Partial<GS> = {
        x: true,
      };
      const REDUCER = (): Partial<GS> => NEW_STATE;
      const dispatch: Dispatcher<typeof REDUCER> =
        globalStateManager.createDispatcher(REDUCER);
      dispatch();
      expect(spy.set.calledOnceWithExactly(NEW_STATE)).to.equal(true);
    });

    describe('return value', (): void => {

      const REDUCER = (): GS => ({
        x: true,
        y: 1,
        z: 'any',
      });

      let dispatch: Dispatcher<typeof REDUCER>;
      beforeEach((): void => {
        dispatch = globalStateManager.createDispatcher(REDUCER);
      });

      it('should be a Promise', (): void => {
        const NOOP = (): void => { };
        expect(dispatch().catch(NOOP)).to.be.instanceOf(Promise);
      });

      it('should resolve to the new global state', async (): Promise<void> => {
        const value: GS = await dispatch();
        expect(value).to.deep.equal(globalStateManager.state);
      });
    });

  });
};
