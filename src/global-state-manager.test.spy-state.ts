import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';
import { GS, INITIAL_STATE } from './utils/test/initial';



const MOCK_STATE: Partial<GS> = {
  x: true,
  y: 1,
};

const PROPERTY_LISTENER = (): void => { };



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.spyState).to.be.a('function');
    expect(globalStateManager.spyState.length).to.equal(1);
  });

  it('should return the current state', async (): Promise<void> => {
    await globalStateManager.set(MOCK_STATE);
    expect(globalStateManager.spyState(PROPERTY_LISTENER)).to.deep.equal({
      ...INITIAL_STATE,
      ...MOCK_STATE,
    });
  });

  it('should add a property listener when accessed', (): void => {
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(false);
    globalStateManager.spyState(PROPERTY_LISTENER).x;
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(true);
  });
};
