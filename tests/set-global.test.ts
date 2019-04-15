import GlobalStateManager from '../src/global-state-manager';
import setGlobal from '../src/set-global';
import { GS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const CALLBACK: jest.Mock<void, []> = jest.fn();

const STATE_CHANGE: Partial<GS> = {
  x: true,
};

const NEW_STATE: GS = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('setGlobal', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(setGlobal).toBeInstanceOf(Function);
    expect(setGlobal).toHaveLength(3);
  });

  it(
    'should return a Promise if there is no callback',
    async (): Promise<void> => {
      const p = setGlobal<GS>(globalStateManager, STATE_CHANGE);
      expect(p).toBeInstanceOf(Promise);
      await p;
    }
  );

  it(
    'should return a Promise if there is a callback',
    async (): Promise<void> => {
      const p = setGlobal<GS>(globalStateManager, STATE_CHANGE, CALLBACK);
      expect(p).toBeInstanceOf(Promise);
      await p;
    }
  );

  it(
    'should call the callback with the new global state',
    async (): Promise<void> => {
      await setGlobal<GS>(globalStateManager, STATE_CHANGE, CALLBACK);
      expect(CALLBACK).toHaveBeenCalledTimes(1);
      expect(CALLBACK).toHaveBeenCalledWith(NEW_STATE);
    }
  );



  describe('GlobalStateManager.set', (): void => {

    const spies = spyOn('set');

    it('should be called if there is no callback', async (): Promise<void> => {
        await setGlobal<GS>(globalStateManager, STATE_CHANGE);
        expect(spies.set).toHaveBeenCalledTimes(1);
        expect(spies.set).toHaveBeenCalledWith(STATE_CHANGE);
    });

    it('should be called if there is a callback', async (): Promise<void> => {
        await setGlobal<GS>(globalStateManager, STATE_CHANGE, CALLBACK);
        expect(spies.set).toHaveBeenCalledTimes(1);
        expect(spies.set).toHaveBeenCalledWith(STATE_CHANGE);
    });
  });

});
