import { expect } from 'chai';
import GlobalStateManager, {
  INVALID_NEW_GLOBAL_STATE,
} from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const NEW_STATE: GS = {
  ...INITIAL_STATE,
  x: true,
};



export default (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('setFunction', 'setObject', 'setPromise');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.set).to.be.a('function');
    expect(globalStateManager.set.length).to.equal(1);
  });

  it('should not accept boolean', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set(true);
    }).to.throw(INVALID_NEW_GLOBAL_STATE);
  });

  it('should not accept number', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set(1);
    }).to.throw(INVALID_NEW_GLOBAL_STATE);
  });

  it('should not accept string', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set('any');
    }).to.throw(INVALID_NEW_GLOBAL_STATE);
  });

  it(
    'should call setFunction if the new state is a function',
    async (): Promise<void> => {
      const FUNC = (): null => null;
      const set: Promise<GS> = globalStateManager.set(FUNC);
      expect(spy.setFunction.calledOnceWithExactly(FUNC)).to.equal(true);
      await set;
    }
  );

  it(
    'should call setObject if the new state is an object',
    async (): Promise<void> => {
      const OBJ: Partial<GS> = {
        x: true,
      };
      const set: Promise<GS> = globalStateManager.set(OBJ);
      expect(spy.setObject.calledOnceWithExactly(OBJ)).to.equal(true);
      await set;
    }
  );

  it(
    'should call setPromise if the new state is a Promise',
    async (): Promise<void> => {
      const PROMISE: Promise<Partial<GS>> = Promise.resolve({
        x: true,
      });
      const set: Promise<GS> = globalStateManager.set(PROMISE);
      expect(spy.setPromise.calledOnceWithExactly(PROMISE)).to.equal(true);
      await set;
    }
  );

  describe('returned Promise of the new state', (): void => {

    it('should exist if the new state is null', async (): Promise<void> => {
      const set: Promise<GS> = globalStateManager.set(null);
      expect(set).to.be.instanceOf(Promise);
      const globalState: GS = await set;
      expect(globalState).to.deep.equal(INITIAL_STATE);
    });

    it(
      'should exist if the new state is a function',
      async (): Promise<void> => {
        const FUNC = (): Partial<GS> => ({
          x: true,
        });
        const set: Promise<GS> = globalStateManager.set(FUNC);
        expect(set).to.be.instanceOf(Promise);
        const globalState: GS = await set;
        expect(globalState).to.deep.equal(NEW_STATE);
      }
    );

    it(
      'should exist if the new state is an object',
      async (): Promise<void> => {
        const set: Promise<GS> = globalStateManager.set({
          x: true,
        });
        expect(set).to.be.instanceOf(Promise);
        const globalState: GS = await set;
        expect(globalState).to.deep.equal(NEW_STATE);
      }
    );

    it(
      'should exist if the new state is a Promise',
      async (): Promise<void> => {
        const set: Promise<GS> = globalStateManager.set(Promise.resolve({
          x: true,
        }));
        expect(set).to.be.instanceOf(Promise);
        const globalState: GS = await set;
        expect(globalState).to.deep.equal(NEW_STATE);
      }
    );
  });
};
