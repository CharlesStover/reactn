import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';
import { GS, INITIAL_STATE } from './utils/test/initial';
import spyOn from './utils/test/spy-on-global-state-manager';



const FUNC = (gs: GS): Partial<GS> => ({
  x: !gs.x,
});

const STATE_CHANGE: Partial<GS> = FUNC(INITIAL_STATE);



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('set');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setFunction).to.be.a('function');
    expect(globalStateManager.setFunction.length).to.equal(1);
  });

  it('should call set', async (): Promise<void> => {
    const set: Promise<GS> = globalStateManager.setFunction(FUNC);
    expect(spy.set.calledOnceWithExactly(STATE_CHANGE)).to.equal(true);
    await set;
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<GS | void> = globalStateManager.setFunction(FUNC);
      expect(set).to.be.instanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.setFunction(FUNC);
      const value = await set;
      expect(value).to.deep.equal({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });
};
