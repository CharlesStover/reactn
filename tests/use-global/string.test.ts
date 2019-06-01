import GlobalStateManager from '../../src/global-state-manager';
import setGlobal from '../../src/set-global';
import useGlobal from '../../src/use-global';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import { StateTuple } from '../../types/use-global';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasHooks } from '../utils/react-version';



type P = [ keyof G ];

// T for Tuple
type T = StateTuple<G, P[0]>;



const PROPERTY: keyof G = 'z';

const NEW_VALUE: G[typeof PROPERTY] = 'any';

const STATE_CHANGE: Partial<G> = {
  [PROPERTY]: NEW_VALUE,
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useGlobal(string)', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  let testUseGlobal: HookTest<P, T>;

  beforeEach((): void => {
    globalStateManager =
      new GlobalStateManager<G, R>(INITIAL_STATE, INITIAL_REDUCERS);
    testUseGlobal =
      new HookTest<P, T>(
        (property: P[0]): T => useGlobal(globalStateManager, property),
      );
  });



  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      testUseGlobal.render(PROPERTY);
      expect(testUseGlobal.error).toBe(REACT_HOOKS_ERROR);
    });
    return;
  }



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
        const [ , setValue ]: T = testUseGlobal.value;
        await setValue(NEW_VALUE);
        expect(testUseGlobal.renders).toBe(2);
      }
    );

    it(
      'should not subscribe to unrelated state changes',
      async (): Promise<void> => {
        const STATE_CHANGE: Partial<G> = {
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
      const CALLBACK: jest.Mock<void, [ G ]> = jest.fn();

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render(PROPERTY);
          const [ , setValue ]: T = testUseGlobal.value;
          let set: Promise<G>;
          set = setValue(NEW_VALUE, CALLBACK);
          expect(set).toBeInstanceOf(Promise);
          let value: G;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: T = testUseGlobal.value;
        await setValue(NEW_VALUE, CALLBACK);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });

      it('should execute the callback', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: T = testUseGlobal.value;
        await setValue(NEW_VALUE, CALLBACK);
        expect(CALLBACK).toHaveBeenCalledTimes(1);
        expect(CALLBACK).toHaveBeenCalledWith(
          NEW_STATE,
          globalStateManager.dispatchers,
          STATE_CHANGE,
        );
      });
    });

    describe('without callback', (): void => {

      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          testUseGlobal.render(PROPERTY);
          const [ , setValue ]: T = testUseGlobal.value;
          let set: Promise<G>;
          set = setValue(NEW_VALUE);
          expect(set).toBeInstanceOf(Promise);
          let value: G;
          value = await set;
          expect(value).toEqual(NEW_STATE);
        }
      );

      it('should update the state', async (): Promise<void> => {
        testUseGlobal.render(PROPERTY);
        const [ , setValue ]: T = testUseGlobal.value;
        await setValue(NEW_VALUE);
        expect(globalStateManager.state).toEqual(NEW_STATE);
      });
    });
  });

});
