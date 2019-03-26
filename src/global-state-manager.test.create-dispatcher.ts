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

  it('should be a function', (): void => {
    expect(globalStateManager.createDispatcher).to.be.a('function');
  });

  it('should accept 1 parameter', (): void => {
    expect(globalStateManager.createDispatcher.length).to.equal(1);
  });



  describe('return value', (): void => {

    it('should be a function', (): void => {
      const dispatch: Dispatcher<typeof INITIAL_REDUCERS.reset> =
        globalStateManager.createDispatcher(INITIAL_REDUCERS.reset);
      expect(dispatch).to.be.a('function');
    });

    it('should auto-fill the global state', (): void => {

      const REDUCER_WITH_ARGS = (_gs: GS, _1: boolean, _2: number) => null;
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
    it('should call GlobalStateManager.set', () => {
      const NEW_STATE: Partial<GS> = {
        x: true,
      };
      const REDUCER = (): Partial<GS> => NEW_STATE;
      const dispatch: Dispatcher<typeof REDUCER> =
        globalStateManager.createDispatcher(REDUCER);
      dispatch();
      expect(spy.set.calledOnceWithExactly(NEW_STATE)).to.equal(true);
    });
  })
};