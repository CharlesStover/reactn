import ReactN = require('../../src/index');
import createProvider from '../../src/create-provider';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import Dispatcher, { ExtractArguments } from '../../types/dispatcher';
import ReactNProvider from '../../types/provider';
import HookTest from '../utils/hook-test';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = ExtractArguments<R[typeof NAME]>;

type P = [ keyof R ];

type V = Dispatcher<G, A>;



const ARGS: A = [ 'te', 'st' ];

const EMPTY_STATE: {} = Object.create(null);

const NAME: keyof R = 'append';



describe('Context useDispatch(string)', (): void => {

  // If Hooks are not supported,
  if (!hasHooks) {
    it.todo('should require hooks');
    return;
  }



  const Provider: ReactNProvider<G, R> = createProvider<G, R>(
    INITIAL_STATE,
    INITIAL_REDUCERS,
  );

  const spy = spyOn('set');

  const STATE_CHANGE: Partial<G> = INITIAL_REDUCERS[NAME](
    INITIAL_STATE,
    Provider.dispatcherMap,
    ...ARGS,
  );
  
  const NEW_STATE: G = {
    ...INITIAL_STATE,
    ...STATE_CHANGE,
  };



  let dispatch: Dispatcher<G, A>;
  let testUseDispatch: HookTest<P, V>;
  beforeEach((): void => {
    testUseDispatch =
      new HookTest<P, V>(
        (reducer: keyof R): V => ReactN.useDispatch<G, R>(reducer)
      )
        .addParent(Provider);
    testUseDispatch.render(NAME);
    dispatch = testUseDispatch.value;
  });

  afterEach((): void => {
    Provider.reset();
  });



  it('should call GlobalStateManager.set', async (): Promise<void> => {
    await dispatch(...ARGS);
    expect(spy.set).toHaveBeenCalledTimes(1);
    expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, NAME, ARGS);
  });

  it('should update the Context global state', async (): Promise<void> => {
    await dispatch(...ARGS);
    expect(Provider.global).toEqual(NEW_STATE);
  });

  it('should not update the default global state', async (): Promise<void> => {
    await dispatch(...ARGS);
    expect(defaultGlobalStateManager.state).toStrictEqual(EMPTY_STATE);
  });

});
