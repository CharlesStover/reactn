import GlobalStateManager, { PropertyListener } from '../../src/global-state-manager';



interface GS {
  x: boolean;
}



const INITIAL_STATE: GS = {
  x: false,
};

const PROPERTY: keyof GS = 'x';

const PROPERTY_LISTENER: PropertyListener = (): void => { };



describe('GlobalStateManager.addPropertyListener', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(globalStateManager.addPropertyListener).toEqual(expect.any(Function));;
    expect(globalStateManager.addPropertyListener.length).toBe(2);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER))
      .toBeUndefined();
  });



  describe('properties without listeners', (): void => {

    it('should add a property listener', (): void => {
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .toBe(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .toBe(true);
    });

    it('should not return anything', (): void => {
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(value).toBeUndefined();
    });
  });



  describe('properties with listeners', (): void => {

    const PROPERTY_LISTENER2 = (): void => { };

    it('should add a property listener', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
        .toBe(true);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .toBe(false);
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER2))
        .toBe(true);
    });

    it('should not return anything', (): void => {
      globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
      const value: void =
        globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER2);
      expect(value).toBeUndefined();
    });
  });

});
