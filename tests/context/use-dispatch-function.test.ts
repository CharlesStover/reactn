import ReactN = require('../../src/index');
import createProvider, { ReactNProvider } from '../../src/create-provider';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import Reducer, { Dispatcher } from '../../src/typings/reducer';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ Reducer<G, R, A> ];

type V = Dispatcher<G, A>;



const ARGS: string[] = [ 'te', 'st' ];

const EMPTY_STATE: {} = Object.create(null);

const Provider: ReactNProvider<G> = createProvider<G>(INITIAL_STATE);

const REDUCER: Reducer<G, R, A> = INITIAL_REDUCERS.append;

const STATE_CHANGE: Partial<G> =
  REDUCER(INITIAL_STATE, INITIAL_REDUCERS, ...ARGS);

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('Context useDispatch(Function)', (): void => {

  let reducer: Dispatcher<G, A>;
  let testUseDispatch: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    testUseDispatch =
      new HookTest<P, V>(
        (reducer: Reducer<G, R, A>): V => ReactN.useDispatch<G, R, A>(reducer),
      )
        .addParent(Provider);
    testUseDispatch.render(REDUCER);
    reducer = testUseDispatch.value;
  });

  afterEach((): void => {
    Provider.reset();
  });



  it('should call GlobalStateManager.set', async (): Promise<void> => {
    await reducer(...ARGS);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE);
  });

  it('should update the Context global state', async (): Promise<void> => {
    await reducer(...ARGS);
    expect(Provider.global).toEqual(NEW_STATE);
  });

  it('should not update the default global state', async (): Promise<void> => {
    await reducer(...ARGS);
    expect(defaultGlobalStateManager.state).toStrictEqual(EMPTY_STATE);
  });

});
