import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const MOCK_STATE: Partial<GS> = {
  x: true,
  y: 1,
};

const PROPERTY: keyof GS = 'x';

const PROPERTY_LISTENER = (): void => { };



describe('GlobalStateManager.spyState', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('addPropertyListener');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.spyState).toEqual(expect.any(Function));;
    expect(globalStateManager.spyState.length).toBe(1);
  });

  it('should return the current state', async (): Promise<void> => {
    await globalStateManager.set(MOCK_STATE);
    expect(globalStateManager.spyState(PROPERTY_LISTENER)).toEqual({
      ...INITIAL_STATE,
      ...MOCK_STATE,
    });
  });

  it('should add a property listener when accessed', (): void => {
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(false);
    globalStateManager.spyState(PROPERTY_LISTENER)[PROPERTY];
    expect(spy.addPropertyListener).toHaveBeenCalledTimes(1);
    expect(spy.addPropertyListener).toHaveBeenCalledWith(PROPERTY, PROPERTY_LISTENER);
  });
});
