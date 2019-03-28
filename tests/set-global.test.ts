import { expect } from 'chai';
import sinon from 'sinon';
import GlobalStateManager from '../src/global-state-manager';
import setGlobal from '../src/helpers/set-global';

interface GlobalState {
  x: boolean;
}

const INITIAL_X: GlobalState['x'] = false;

const INITIAL_GLOBAL_STATE: GlobalState = {
  x: INITIAL_X,
};

describe('setGlobal', (): void => {

  let globalStateManager: GlobalStateManager<GlobalState>;
  beforeEach((): void => {
    globalStateManager =
      new GlobalStateManager<GlobalState>(INITIAL_GLOBAL_STATE);
  });


  it('should be a function with 3 arguments', (): void => {
    expect(setGlobal).to.be.a('function');
    expect(setGlobal.length).to.equal(3);
  });

  it(
    'should return a Promise if there is no callback',
    async (): Promise<void> => {
      const p = setGlobal(globalStateManager, {});
      expect(p).to.be.instanceOf(Promise);
      await p;
    }
  );

  it(
    'should return a Promise if there is a callback',
    async (): Promise<void> => {
      const p = setGlobal(globalStateManager, {}, (): void => {});
      expect(p).to.be.instanceOf(Promise);
      await p;
    }
  );



  describe('callback', (): void => {

    it('should be called', async (): Promise<void> => {
      const NEW_GLOBAL_STATE: GlobalState = {
        x: true,
      };

      const callback = sinon.spy();
      await setGlobal(globalStateManager, NEW_GLOBAL_STATE, callback);
      expect(callback.calledOnce).to.equal(true);
    });

    it('should receive the global state', async (): Promise<void> => {
      const NEW_X: GlobalState['x'] = true;
      const NEW_GLOBAL_STATE: GlobalState = {
        x: NEW_X,
      };
      expect(NEW_X).not.to.equal(INITIAL_X);

      let x: GlobalState['x'] = INITIAL_X;
      const callback = (globalState: GlobalState): void => {
        x = globalState.x;
      };
      await setGlobal(globalStateManager, NEW_GLOBAL_STATE, callback);
      expect(x).to.equal(NEW_X);
    });
  });



  describe('GlobalStateManager.set', (): void => {

    const NEW_GLOBAL_STATE: GlobalState = {
      x: true,
    };
    let set: sinon.SinonSpy;
    beforeEach((): void => {
      set = sinon.spy(GlobalStateManager.prototype, 'set');
    });
    afterEach((): void => {
      set.restore();
    });

    it('should be called if there is no callback', async (): Promise<void> => {
        await setGlobal(globalStateManager, NEW_GLOBAL_STATE);
        expect(set.calledOnceWithExactly(NEW_GLOBAL_STATE)).to.equal(true);
    });

    it('should be called if there is a callback', async (): Promise<void> => {
        await setGlobal(globalStateManager, NEW_GLOBAL_STATE, (): void => {});
        expect(set.calledOnceWithExactly(NEW_GLOBAL_STATE)).to.equal(true);
    });
  });

});
