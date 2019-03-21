import { expect } from 'chai';
import sinon from 'sinon';
import GlobalStateManager from '../global-state-manager';
import setGlobal from './set-global';

interface GlobalState {
  x: boolean;
}

const INITIAL_X: GlobalState['x'] = false;

const INITIAL_GLOBAL_STATE: GlobalState = {
  x: INITIAL_X,
};

describe('setGlobal', () => {

  let globalStateManager: GlobalStateManager<GlobalState>;
  beforeEach(() => {
    globalStateManager =
      new GlobalStateManager<GlobalState>(INITIAL_GLOBAL_STATE);
  });


  it('should be a function', () => {
    expect(setGlobal).to.be.a('function');
  });

  it('should accept 3 parameters', () => {
    expect(setGlobal.length).to.equal(3);
  });

  it('should return a Promise if there is no callback', async () => {
    const p = setGlobal(globalStateManager, {});
    expect(p).to.be.instanceOf(Promise);
    await p;
  });

  it('should return a Promise if there is a callback', async () => {
    const p = setGlobal(globalStateManager, {}, () => {});
    expect(p).to.be.instanceOf(Promise);
    await p;
  });



  describe('callback', () => {

    it('should be called', async () => {
      const NEW_GLOBAL_STATE: GlobalState = {
        x: true,
      };

      const callback = sinon.spy();
      await setGlobal(globalStateManager, NEW_GLOBAL_STATE, callback);
      expect(callback.calledOnce).to.equal(true);
    });

    it('should receive the global state', async () => {
      const NEW_X: GlobalState['x'] = true;
      const NEW_GLOBAL_STATE: GlobalState = {
        x: NEW_X,
      };
      expect(NEW_X).not.to.equal(INITIAL_X);

      let x: GlobalState['x'] = INITIAL_X;
      const callback = (globalState: GlobalState) => {
        x = globalState.x;
      };
      await setGlobal(globalStateManager, NEW_GLOBAL_STATE, callback);
      expect(x).to.equal(NEW_X);
    });
  });



  describe('GlobalStateManager', () => {
    describe('set', () => {

      const NEW_GLOBAL_STATE: GlobalState = {
        x: true,
      };
      let set: sinon.SinonSpy;
      beforeEach(() => {
        set = sinon.spy(GlobalStateManager.prototype, 'set');
      });
      afterEach(() => {
        set.restore();
      });

      it(
        'should be called with correct parameters if there is no callback',
        async () => {
          await setGlobal(globalStateManager, NEW_GLOBAL_STATE);
          expect(set.calledOnceWithExactly(NEW_GLOBAL_STATE)).to.equal(true);
        }
      );

      it(
        'should be called with correct parameters if there is a callback',
        async () => {
          await setGlobal(globalStateManager, NEW_GLOBAL_STATE, () => {});
          expect(set.calledOnceWithExactly(NEW_GLOBAL_STATE)).to.equal(true);
        }
      );
    });
  });

});
