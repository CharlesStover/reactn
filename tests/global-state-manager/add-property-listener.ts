import { expect } from 'chai';
import GlobalStateManager, { PropertyListener } from '../../src/global-state-manager';



interface GS {
  x: boolean;
}



const INITIAL_STATE: GS = {
  x: false,
};

const PROPERTY: keyof GS = 'x';

const PROPERTY_LISTENER: PropertyListener = (): void => { };



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.addPropertyListener).to.be.a('function');
    expect(globalStateManager.addPropertyListener.length).to.equal(2);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER))
      .to.be.undefined;
  });



  describe('properties without listeners', (): void => {

    it('should add a property listener', (): void => {
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(true);
    });

    it('should not return anything', (): void => {
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(value).to.be.undefined;
    });
  });



  describe('properties with listeners', (): void => {

    const PROPERTY_LISTENER2 = (): void => { };

    it('should add a property listener', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .to.equal(true);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .to.equal(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .to.equal(true);
    });

    it('should not return anything', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(value).to.be.undefined;
    });
  });
};
