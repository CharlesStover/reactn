import createProvider from '../../src/create-provider';
import ReactNProvider from '../../types/provider';
import { G, INITIAL_STATE } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';
import itShouldRequireContext from './utils/it-should-require-context';



describe('Provider.global', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G>;
  const spy = spyOn('state');
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE);
  });



  it('should be an object', (): void => {
    // Provider.global extends Object.create(null), so it has no prototype.
    expect(Provider.global).toEqual(expect.any(Object));
  });

  it('should not have a setter', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.global = true;
    }).toThrow();
  });

  it('should call GlobalStateManager.state', (): void => {
    Provider.global;
    expect(spy.state).toHaveBeenCalledTimes(1);
    expect(spy.state).toHaveBeenCalledWith();
  });

  it('should return a copy of the state', (): void => {
    const state: G = Provider.global;
    expect(state).toEqual(INITIAL_STATE);
    expect(state).not.toBe(INITIAL_STATE);
  });

  it('should update when the state updates', async (): Promise<void> => {
    const STRING = 'create-provider.test.global';

    expect(Provider.global.z).not.toBe(STRING);
    await Provider.setGlobal({
      z: STRING,
    });
    expect(Provider.global.z).toBe(STRING);
  });
});
