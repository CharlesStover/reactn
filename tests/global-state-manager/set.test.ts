import GlobalStateManager, {
  INVALID_NEW_GLOBAL_STATE,
} from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



const NEW_STATE: G = {
  ...INITIAL_STATE,
  x: true,
};



describe('GlobalStateManager.set', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  const spy = spyOn('setFunction', 'setObject', 'setPromise');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.set).toBeInstanceOf(Function);
    expect(globalStateManager.set).toHaveLength(1);
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
      const set: Promise<G> = globalStateManager.set(FUNC);
      expect(spy.setFunction).toHaveBeenCalledTimes(1);
      expect(spy.setFunction).toHaveBeenCalledWith(FUNC);
      await set;
    }
  );

  it(
    'should call setObject if the new state is an object',
    async (): Promise<void> => {
      const OBJ: Partial<G> = {
        x: true,
      };
      const set: Promise<G> = globalStateManager.set(OBJ);
      expect(spy.setObject).toHaveBeenCalledTimes(1);
      expect(spy.setObject).toHaveBeenCalledWith(OBJ);
      await set;
    }
  );

  it(
    'should call setPromise if the new state is a Promise',
    async (): Promise<void> => {
      const PROMISE: Promise<Partial<G>> = Promise.resolve({
        x: true,
      });
      const set: Promise<G> = globalStateManager.set(PROMISE);
      expect(spy.setPromise).toHaveBeenCalledTimes(1);
      expect(spy.setPromise).toHaveBeenCalledWith(PROMISE);
      await set;
    }
  );



  describe('returned Promise of the new state', (): void => {

    it('should exist if the new state is null', async (): Promise<void> => {
      const set: Promise<G> = globalStateManager.set(null);
      expect(set).toBeInstanceOf(Promise);
      const globalState: G = await set;
      expect(globalState).toEqual(INITIAL_STATE);
    });

    it(
      'should exist if the new state is a function',
      async (): Promise<void> => {
        const FUNC = (): Partial<G> => ({
          x: true,
        });
        const set: Promise<G> = globalStateManager.set(FUNC);
        expect(set).toBeInstanceOf(Promise);
        const globalState: G = await set;
        expect(globalState).toEqual(NEW_STATE);
      }
    );

    it(
      'should exist if the new state is an object',
      async (): Promise<void> => {
        const set: Promise<G> = globalStateManager.set({
          x: true,
        });
        expect(set).toBeInstanceOf(Promise);
        const globalState: G = await set;
        expect(globalState).toEqual(NEW_STATE);
      }
    );

    it(
      'should exist if the new state is a Promise',
      async (): Promise<void> => {
        const set: Promise<G> = globalStateManager.set(Promise.resolve({
          x: true,
        }));
        expect(set).toBeInstanceOf(Promise);
        const globalState: G = await set;
        expect(globalState).toEqual(NEW_STATE);
      }
    );
  });

});
