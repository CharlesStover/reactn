import ReactN = require('../../src/index');
import createProvider, { ReactNProvider } from '../../src/create-provider';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import Reducer, { Dispatcher } from '../../src/typings/reducer';
import HookTest from '../utils/hook-test';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type P = [ keyof R ];

type V = Dispatcher<GS, A>;



const ARGS: string[] = [ 'te', 'st' ];

const EMPTY_STATE: {} = Object.create(null);

const Provider: ReactNProvider<GS> = createProvider<GS, R>(
  INITIAL_STATE,
  INITIAL_REDUCERS,
);

const REDUCER: keyof R = 'append';

const STATE_CHANGE: Partial<GS> =
  INITIAL_REDUCERS[REDUCER](INITIAL_STATE, ...ARGS) as Partial<GS>;

const NEW_STATE: GS = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('Context useGlobalReducer(Function)', (): void => {

  let reducer: Dispatcher<GS, A>;
  let testUseGlobalReducer: HookTest<P, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    testUseGlobalReducer =
      new HookTest<P, V>(
        (reducer: keyof R): V => ReactN.useGlobalReducer<GS, R>(reducer)
      )
        .addParent(Provider);
    testUseGlobalReducer.render(REDUCER);
    reducer = testUseGlobalReducer.value;
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
