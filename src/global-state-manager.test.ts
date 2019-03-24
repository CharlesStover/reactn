import { expect } from 'chai';
import GlobalStateManager, { PropertyListener } from './global-state-manager';
import Callback from './typings/callback';
import Reducer from './typings/reducer';

type BooleanFunction = () => boolean;

interface GS {
  x: boolean;
  y: number;
  z: string;
}



const CALLBACK: Callback<GS> = () => {};

const INITIAL_STATE: GS = {
  x: false,
  y: 1,
  z: 'string',
};

const PROPERTY: keyof GS = 'x';

const PROPERTY_LISTENER: PropertyListener = () => {};

const REDUCER: Reducer<GS> = () => INITIAL_STATE;

const REDUCER1: Reducer<GS> = (_globalState: GS, one: boolean) => ({
  x: one,
});

const REDUCER2: Reducer<GS> =
  (globalState: GS, two: number, three: string) => ({
    y: globalState.y + two,
    z: three,
  });

const REDUCER_NAME = 'reducerName';

const REDUCER_NAME1 = 'reducerName1';

const REDUCER_NAME2 = 'reducerName2';



describe('GlobalStateManager', () => {



  it('should initial with an empty state object', () => {
    const globalStateManager: GlobalStateManager<{}> =
      new GlobalStateManager<{}>();
    expect(globalStateManager.state).to.deep.equal({});
  });

  it('should support an initial state', () => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS>(INITIAL_STATE);
    expect(globalStateManager.state).to.deep.equal(INITIAL_STATE);
  });



  describe('addCallback', () => {

    let globalStateManager: GlobalStateManager<{}>;
    beforeEach(() => {
      globalStateManager = new GlobalStateManager<{}>({});
    });

    it('should be a function', () => {
      expect(globalStateManager.addCallback).to.be.a('function');
    });

    it('should accept 1 parameter', () => {
      expect(globalStateManager.addCallback.length).to.equal(1);
    });

    it('should add a callback', () => {
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
      globalStateManager.addCallback(CALLBACK);
      expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
    });



    describe('return value', () => {

      let removeCallback: BooleanFunction;
      beforeEach(() => {
        removeCallback = globalStateManager.addCallback(CALLBACK);
      });

      it('should be a function', () => {
        expect(removeCallback).to.be.a('function');
      });

      it('should accept no parameters', () => {
        expect(removeCallback.length).to.equal(0);
      });

      it('should remove the callback', () => {
        expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
        removeCallback();
        expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
      });
    });
  });



  describe('addPropertyListener', () => {

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
  });
});
