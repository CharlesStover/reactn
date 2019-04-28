import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



const EMPTY_OBJECT: {} = Object.create(null);

const INITIAL_REDUCERS_KEYS: string[] = Object.keys(INITIAL_REDUCERS);

INITIAL_REDUCERS_KEYS.sort();



describe('GlobalStateManager.constructor', (): void => {

  it('should initialize with an empty state object', (): void => {
    const globalStateManager: GlobalStateManager = new GlobalStateManager();
    expect(globalStateManager.state).toStrictEqual(EMPTY_OBJECT);
  });

  it('should initialize with an empty dispatchers object', (): void => {
    const globalStateManager: GlobalStateManager = new GlobalStateManager();
    expect(globalStateManager.dispatchers).toStrictEqual(EMPTY_OBJECT);
  });

  it('should support an initial state', (): void => {
    const globalStateManager: GlobalStateManager<G> =
      new GlobalStateManager<G>(INITIAL_STATE);
    expect(globalStateManager.state).toEqual(INITIAL_STATE);
  });

  it('should support initial dispatchers', (): void => {
    const globalStateManager: GlobalStateManager<G, R> =
      new GlobalStateManager<G, R>(INITIAL_STATE, INITIAL_REDUCERS);
    const dispatchers: string[] = Object.keys(globalStateManager.dispatchers);
    dispatchers.sort();
    expect(dispatchers).toStrictEqual(INITIAL_REDUCERS_KEYS);
  });
});
