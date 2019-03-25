import { expect } from 'chai';
import GlobalStateManager, { PropertyListener } from './global-state-manager';



interface GS {
  x: boolean;
}



const INITIAL_STATE: GS = {
  x: false,
};

const PROPERTY: keyof GS = 'x';

const PROPERTY_LISTENER: PropertyListener = () => {};



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function', () => {
    expect(globalStateManager.addPropertyListener).to.be.a('function');
  });

  it('should accept 2 parameters', () => {
    expect(globalStateManager.addPropertyListener.length).to.equal(2);
  });

  it('should not return anything', () => {
    expect(globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER))
      .to.be.undefined;
  });



  describe('properties without listeners', () => {

    it('should add a property listener', () => {
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(true);
    });

    it('should not return anything', () => {
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(value).to.be.undefined;
    });
  });



  describe('properties with listeners', () => {

    it('should add a property listener', () => {
      const PROPERTY_LISTENER2 = () => {};
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(true);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .to.equal(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .to.equal(true);
    });

    it('should not return anything', () => {
      const PROPERTY_LISTENER2 = () => {};
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(value).to.be.undefined;
    });
  });
};
