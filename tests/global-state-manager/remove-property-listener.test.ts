import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



const PROPERTY: keyof GS = 'x';
const PROPERTY_LISTENER = (): void => { };



describe('GlobalStateManager.removePropertyListener', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removePropertyListener).to.be.a('function');
    expect(globalStateManager.removePropertyListener.length).to.equal(1);
  });

  it('remove a property listener', (): void => {
    globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(true);
    globalStateManager.removePropertyListener(PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(false);
  });



  describe('return value', (): void => {

    it('should be true if the property listener existed', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      const removed: boolean =
        globalStateManager.removePropertyListener(PROPERTY_LISTENER);
      expect(removed).to.equal(true);
    });

    it('should be false if the property listener did not exist', (): void => {
      const removed: boolean =
        globalStateManager.removePropertyListener(PROPERTY_LISTENER);
      expect(removed).to.equal(false);
    });
  });

});
