import GlobalStateManager, {
  INVALID_NEW_GLOBAL_STATE,
} from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = [ boolean, number, string ];



const REDUCER_ARGS: A = [ true, 1, 'str' ];

const REDUCER_NAME: string = 'reducerName';

const STATE_CHANGE: Partial<G> = Object.assign(Object.create(null), {
  x: true,
});



describe('GlobalStateManager.set', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('setFunction', 'setObject', 'setPromise');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(globalStateManager.set).toBeInstanceOf(Function);
    expect(globalStateManager.set).toHaveLength(3);
  });

  it('should not accept boolean', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set(true);
    }).toThrow(INVALID_NEW_GLOBAL_STATE);
  });

  it('should not accept number', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set(1);
    }).toThrow(INVALID_NEW_GLOBAL_STATE);
  });

  it('should not accept string', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.set('any');
    }).toThrow(INVALID_NEW_GLOBAL_STATE);
  });

  it(
    'should call setFunction if the new state is a function',
    async (): Promise<void> => {
      const FUNC = (): null => null;
      const set: Promise<Partial<G>> =
        globalStateManager.set(FUNC, REDUCER_NAME, REDUCER_ARGS);
      expect(spy.setFunction).toHaveBeenCalledTimes(1);
      expect(spy.setFunction)
        .toHaveBeenCalledWith(FUNC, REDUCER_NAME, REDUCER_ARGS);
      await set;
    }
  );

  it(
    'should call setObject if the new state is an object',
    async (): Promise<void> => {
      const OBJ: Partial<G> = {
        x: true,
      };
      const set: Promise<Partial<G>> =
        globalStateManager.set(OBJ, REDUCER_NAME, REDUCER_ARGS);
      expect(spy.setObject).toHaveBeenCalledTimes(1);
      expect(spy.setObject)
        .toHaveBeenCalledWith(OBJ, REDUCER_NAME, REDUCER_ARGS);
      await set;
    }
  );

  it(
    'should call setPromise if the new state is a Promise',
    async (): Promise<void> => {
      const PROMISE: Promise<Partial<G>> = Promise.resolve({
        x: true,
      });
      const set: Promise<Partial<G>> =
        globalStateManager.set(PROMISE, REDUCER_NAME, REDUCER_ARGS);
      expect(spy.setPromise).toHaveBeenCalledTimes(1);
      expect(spy.setPromise)
        .toHaveBeenCalledWith(PROMISE, REDUCER_NAME, REDUCER_ARGS);
      await set;
    }
  );



  describe('returned Promise of the state change', (): void => {

    it('should be empty if the new state is null', async (): Promise<void> => {
      const set: Promise<Partial<G>> = globalStateManager.set(null);
      expect(set).toBeInstanceOf(Promise);
      const stateChange: Partial<G> = await set;
      expect(stateChange).toStrictEqual(Object.create(null));
    });

    it(
      'should exist if the new state is a function',
      async (): Promise<void> => {
        const FUNC = (): Partial<G> => STATE_CHANGE;
        const set: Promise<Partial<G>> = globalStateManager.set(FUNC);
        expect(set).toBeInstanceOf(Promise);
        const stateChange: Partial<G> = await set;
        expect(stateChange).toStrictEqual(STATE_CHANGE);
      }
    );

    it(
      'should exist if the new state is an object',
      async (): Promise<void> => {
        const set: Promise<Partial<G>> = globalStateManager.set(STATE_CHANGE);
        expect(set).toBeInstanceOf(Promise);
        const stateChange: Partial<G> = await set;
        expect(stateChange).toStrictEqual(STATE_CHANGE);
      }
    );

    it(
      'should exist if the new state is a Promise',
      async (): Promise<void> => {
        const set: Promise<Partial<G>> = globalStateManager.set(
          Promise.resolve(STATE_CHANGE)
        );
        expect(set).toBeInstanceOf(Promise);
        const stateChange: Partial<G> = await set;
        expect(stateChange).toStrictEqual(STATE_CHANGE);
      }
    );
  });

});
