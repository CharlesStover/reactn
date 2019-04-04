import GlobalStateManager from '../../src/global-state-manager';
import setGlobal from '../../src/set-global';
import useGlobal, { StateTuple } from '../../src/use-global';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import deleteHooks from '../utils/delete-hooks';
import HookTest from '../utils/hook-test';
import { GS, INITIAL_STATE } from '../utils/initial';



type P = [ keyof GS ];

type R = StateTuple<GS, P[0]>;



const PROPERTY: keyof GS = 'z';

const NEW_VALUE: GS[typeof PROPERTY] = 'any';

const NEW_STATE: GS = {
  ...INITIAL_STATE,
  [PROPERTY]: NEW_VALUE,
};



describe('useGlobal(string)', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  let testUseGlobal: HookTest<P, R>;

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
    testUseGlobal =
      new HookTest<P, R>(
        (property: P[0]): R => useGlobal(globalStateManager, property)
      );
  });



  it('should return a tuple', (): void => {
    testUseGlobal.render(PROPERTY);
    expect(testUseGlobal.value).toBeInstanceOf(Array);
    expect(testUseGlobal.value).toHaveLength(2);
    expect(testUseGlobal.value[0]).toEqual(INITIAL_STATE[PROPERTY]);
    expect(testUseGlobal.value[1]).toBeInstanceOf(Function);
    expect(testUseGlobal.value[1]).toHaveLength(2);
  });



  describe('value', (): void => {

    it(
      'should subscribe to related state changes',
      async (): Promise<void> => {
        expect(testUseGlobal.renders).toBe(0);
        testUseGlobal.render(PROPERTY);
        expect(testUseGlobal.renders).toBe(1);
        const [ , setValue ]: R = testUseGlobal.value;
        await setValue(NEW_VALUE);
        expect(testUseGlobal.renders).toBe(2);
      }
    );

    it(
      'should not subscribe to unrelated state changes',
      async (): Promise<void> => {
        const STATE_CHANGE: Partial<GS> = {
          x: true,
        };
        expect(testUseGlobal.renders).toBe(0);
        testUseGlobal.render(PROPERTY);
        expect(testUseGlobal.renders).toBe(1);
        await setGlobal(globalStateManager, STATE_CHANGE);
        expect(testUseGlobal.renders).toBe(1);
      }
    );

    it('should update with state changes', async (): Promise<void> => {

      // Arrange
      testUseGlobal.render(PROPERTY);
      const [ value, setValue ] = testUseGlobal.value;
      expect(value).toBe(INITIAL_STATE[PROPERTY]);
      expect(value).not.toBe(NEW_VALUE);

      // Act
      await setValue(NEW_VALUE);

      // Assert
      const [ newValue ] = testUseGlobal.value;
      expect(newValue).toBe(NEW_VALUE);
    });
  });



  describe('setter', (): void => {

    describe('with callback', (): void => {
      const CALLBACK: jest.Mock<void, [ GS ]> = jest.fn();

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render(PROPERTY);
          const [ , setValue ]: R = testUseGlobal.value;
          let set: Promise<GS>;
          set = setValue(NEW_VALUE, CALLBACK);
          expect(set).toBeInstanceOf(Promise);
          let value: GS;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: R = testUseGlobal.value;
        await setValue(NEW_VALUE, CALLBACK);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });

      it('should execute the callback', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: R = testUseGlobal.value;
        await setValue(NEW_VALUE, CALLBACK);
        expect(CALLBACK).toHaveBeenCalledTimes(1);
        expect(CALLBACK).toHaveBeenCalledWith(NEW_STATE);
      });
    });

    describe('without callback', (): void => {

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render(PROPERTY);
          const [ , setValue ]: R = testUseGlobal.value;
          let set: Promise<GS>;
          set = setValue(NEW_VALUE);
          expect(set).toBeInstanceOf(Promise);
          let value: GS;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: R = testUseGlobal.value;
        await setValue(NEW_VALUE);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });
    });
  });



  describe('React Hooks', (): void => {
    deleteHooks();

    it('should be required', (): void => {
      testUseGlobal.render(PROPERTY);
      expect(testUseGlobal.error).toBe(REACT_HOOKS_ERROR);
    });
  });

});
