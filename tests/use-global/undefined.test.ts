import GlobalStateManager from '../../src/global-state-manager';
import useGlobal, { GlobalTuple } from '../../src/use-global';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { GS, INITIAL_STATE } from '../utils/initial';



type P = [ ];

type R = GlobalTuple<GS>;



const STATE_CHANGE: Partial<GS> = {
  x: true,
};

const NEW_STATE: GS = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useGlobal()', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  let testUseGlobal: HookTest<P, R>;

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);

    testUseGlobal =
      new HookTest<P, R>(
        (): R => useGlobal(globalStateManager)
      );
  });



  it('should return a tuple', (): void => {
    testUseGlobal.render();
    expect(testUseGlobal.value).toBeInstanceOf(Array);
    expect(testUseGlobal.value).toHaveLength(2);
    expect(testUseGlobal.value[0]).toEqual(INITIAL_STATE);
    expect(testUseGlobal.value[1]).toBeInstanceOf(Function);
    expect(testUseGlobal.value[1]).toHaveLength(2);
  });



  describe('value', (): void => {

    it(
      'should subscribe to related state changes',
      async (): Promise<void> => {
        expect(testUseGlobal.renders).toBe(0);
        testUseGlobal.render();
        const [ global, setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
        expect(testUseGlobal.renders).toBe(1);
        global.x;
        await setGlobal(STATE_CHANGE);
        expect(testUseGlobal.renders).toBe(2);
      }
    );

    it(
      'should not subscribe to unrelated state changes',
      async (): Promise<void> => {
        expect(testUseGlobal.renders).toBe(0);
        testUseGlobal.render();
        const [ global, setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
        expect(testUseGlobal.renders).toBe(1);
        global.y;
        await setGlobal(STATE_CHANGE);
        expect(testUseGlobal.renders).toBe(1);
      }
    );

    it('should update with state changes', async (): Promise<void> => {

      // Arrange
      testUseGlobal.render();
      const [ global, setGlobal ] = testUseGlobal.value;
      expect(global).toEqual(INITIAL_STATE);
      expect(global).not.toEqual(NEW_STATE);

      // Act
      await setGlobal(STATE_CHANGE);

      // Assert
      const [ newGlobal ] = testUseGlobal.value;
      expect(newGlobal).toEqual(NEW_STATE);
    });
  });



  describe('setter', (): void => {

    describe('with callback', (): void => {
      const CALLBACK: jest.Mock<void, [ GS ]> = jest.fn();

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render();
          const [ , setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
          let set: Promise<GS>;
          set = setGlobal(STATE_CHANGE, CALLBACK);
          expect(set).toBeInstanceOf(Promise);
          let value: GS;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render();
        const [ , setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
        await setGlobal(STATE_CHANGE, CALLBACK);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });

      it('should execute the callback', async (): Promise<void> => {
        testUseGlobal.render();
        const [ , setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
        await setGlobal(STATE_CHANGE, CALLBACK);
        expect(CALLBACK).toHaveBeenCalledTimes(1);
        expect(CALLBACK).toHaveBeenCalledWith(NEW_STATE);
      });
    });

    describe('without callback', (): void => {

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render();
          const [ , setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
          let set: Promise<GS>;
          set = setGlobal(STATE_CHANGE);
          expect(set).toBeInstanceOf(Promise);
          let value: GS;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render();
        const [ , setGlobal ]: GlobalTuple<GS> = testUseGlobal.value;
        await setGlobal(STATE_CHANGE);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });
    });
  });



  describe('React Hooks', (): void => {
    deleteHooks();

    it('should be required', (): void => {
      testUseGlobal.render();
      expect(testUseGlobal.error).toBe(REACT_HOOKS_ERROR);
    });
  });

});
