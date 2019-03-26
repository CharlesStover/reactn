import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';
import { GS, INITIAL_STATE } from './utils/test/initial';
import spyOn from './utils/test/spy-on-global-state-manager';



const STATE_CHANGE: Partial<GS> = {
  x: true,
};



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('enqueue', 'flush');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.setObject).to.be.a('function');
    expect(globalStateManager.setObject.length).to.equal(1);
  });

  it('should call enqueue and flush', async (): Promise<void> => {
    await globalStateManager.setObject(STATE_CHANGE);
    expect(spy.enqueue.calledOnceWithExactly('x', STATE_CHANGE.x))
      .to.equal(true);
    expect(spy.flush.calledOnceWithExactly()).to.equal(true);
  });



  describe('return value', (): void => {

    it('should be a Promise', async (): Promise<void> => {
      const set: Promise<GS | void> =
        globalStateManager.setObject(STATE_CHANGE);
      expect(set).to.be.instanceOf(Promise);
      await set;
    });

    it('should resolve to the new global state', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.setObject(STATE_CHANGE);
      const value = await set;
      expect(value).to.deep.equal({
        ...INITIAL_STATE,
        ...STATE_CHANGE,
      });
    });
  });
};
