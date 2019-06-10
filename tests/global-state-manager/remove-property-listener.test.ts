import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';



const PROPERTY: keyof G = 'x';

const PROPERTY2: keyof G = 'y';

const PROPERTY_LISTENER = (): void => { };



describe('GlobalStateManager.removePropertyListener', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removePropertyListener).toBeInstanceOf(Function);
    expect(globalStateManager.removePropertyListener).toHaveLength(1);
  });

  it('should remove a property listener', (): void => {
    globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(true);
    globalStateManager.removePropertyListener(PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(false);
  });

  it('should remove more than 1 property listener', (): void => {
    globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
    globalStateManager.addPropertyListener(PROPERTY2, PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(true);
    globalStateManager.removePropertyListener(PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .toBe(false);
  });



  describe('return value', (): void => {

    it('should be true if the property listener existed', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      const removed: boolean =
        globalStateManager.removePropertyListener(PROPERTY_LISTENER);
      expect(removed).toBe(true);
    });

    it('should be false if the property listener did not exist', (): void => {
      const removed: boolean =
        globalStateManager.removePropertyListener(PROPERTY_LISTENER);
      expect(removed).toBe(false);
    });
  });

});
