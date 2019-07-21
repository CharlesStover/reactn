import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';
import itShouldRequireContext from './utils/it-should-require-context';



const STATE_CHANGE: Partial<G> = {
  x: !INITIAL_STATE.x,
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('Provider.setGlobal', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.setGlobal).toBeInstanceOf(Function);
    expect(Provider.setGlobal).toHaveLength(2);
  });

  it(
    'should execute a callback with the new state',
    async (): Promise<void> => {
      const CALLBACK: jest.Mock<void, []> = jest.fn();
      await Provider.setGlobal(STATE_CHANGE, CALLBACK);
      expect(CALLBACK).toHaveBeenCalledTimes(1);
      expect(CALLBACK)
        .toHaveBeenCalledWith(NEW_STATE, Provider.dispatch, STATE_CHANGE);
    }
  );



  describe('GlobalStateManager.set', (): void => {

    const spy = spyOn('set');

    it('should be called without a callback', async (): Promise<void> => {
      await Provider.setGlobal(STATE_CHANGE);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
    });

    it('should be called with a callback', async (): Promise<void> => {
      const NOOP = (): void => { };
      await Provider.setGlobal(STATE_CHANGE, NOOP);
      expect(spy.set).toHaveBeenCalledTimes(2);
      expect(spy.set).toHaveBeenNthCalledWith(1, STATE_CHANGE);
      expect(spy.set).toHaveBeenNthCalledWith(2, undefined);
    });
  });



  describe('return value', (): void => {

    it(
      'should be a Promise of the new global state if there was a callback',
      async (): Promise<void> => {
        const set: Promise<G> = Provider.setGlobal(STATE_CHANGE);
        expect(set).toBeInstanceOf(Promise);
        const value: G = await set;
        expect(value).toEqual(NEW_STATE);
      }
    );

    it(
      'should be a Promise of the new global state ' +
      'if there was not a callback',
      async (): Promise<void> => {
        const NOOP = (): void => { };
        const set: Promise<G> = Provider.setGlobal(STATE_CHANGE, NOOP);
        expect(set).toBeInstanceOf(Promise);
        const value: G = await set;
        expect(value).toEqual(NEW_STATE);
      }
    );
  });

});
