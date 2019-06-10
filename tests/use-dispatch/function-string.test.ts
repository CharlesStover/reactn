import GlobalStateManager from '../../src/global-state-manager';
import useDispatch from '../../src/use-dispatch';
import REACT_HOOKS_ERROR from '../../src/utils/react-hooks-error';
import Dispatcher, { PropertyDispatcher } from '../../types/dispatcher';
import { PropertyReducer } from '../../types/reducer';
import HookTest from '../utils/hook-test';
import { G, INITIAL_STATE } from '../utils/initial';
import { hasHooks } from '../utils/react-version';
import spyOn from '../utils/spy-on-global-state-manager';



type A = string[];

type Params = [ ZReducer, Property ];

type Property = 'z';

type V = PropertyDispatcher<G, Property, A>;

type ZReducer = PropertyReducer<G, Property, string[]>;



const ARGS: string[] = [ 'te', 'st' ];

const PROPERTY: Property = 'z';

const REDUCER: ZReducer =
  (value: G[Property], ...args: string[]): G[Property] =>
    value + args.join('');

const STATE_CHANGE: Partial<G> = {
  [PROPERTY]: REDUCER(INITIAL_STATE.z, ...ARGS),
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('useDispatch(Function, keyof State)', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  let testUseDispatch: HookTest<Params, V>;
  const spy = spyOn('set');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
    testUseDispatch =
      new HookTest<Params, V>(
        (reducer: ZReducer, property: Property): V =>
          useDispatch<G, {}, Property, A>(globalStateManager, reducer, property),
      );
  });


  // If Hooks are not supported,
  if (!hasHooks) {
    it('should require Hooks', (): void => {
      testUseDispatch.render(REDUCER, PROPERTY);
      expect(testUseDispatch.error).toBe(REACT_HOOKS_ERROR);
    });
    return;
  }



  it('should return a function', (): void => {
    testUseDispatch.render(REDUCER, PROPERTY);
    expect(testUseDispatch.value).toBeInstanceOf(Function);
    expect(testUseDispatch.value).toHaveLength(0);
  });

  it('should return an iterator', (): void => {
    testUseDispatch.render(REDUCER, PROPERTY);
    expect(testUseDispatch.value.slice).toBeInstanceOf(Function);
    expect(testUseDispatch.value[Symbol.iterator]).toBeInstanceOf(Function);
  });


  describe('the returned function', (): void => {

    let dispatch: PropertyDispatcher<G, Property, A>;
    beforeEach((): void => {
      testUseDispatch.render(REDUCER, PROPERTY);
      dispatch = testUseDispatch.value;
    });

    it(
      'should return a Promise of the new global state',
      async (): Promise<void> => {
        const reduce: Promise<G> = dispatch(...ARGS);
        expect(reduce).toBeInstanceOf(Promise);
        const value: G = await reduce;
        expect(value).toEqual(NEW_STATE);
      }
    );

    it('should call GlobalStateManager.set', async (): Promise<void> => {
      await dispatch(...ARGS);
      expect(spy.set).toHaveBeenCalledTimes(1);
      expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER.name, ARGS);
    });

    it('should be iterable', (): void => {
      const [ value, newDispatch ] = dispatch;
      expect(value).toBe(INITIAL_STATE[PROPERTY]);
      expect(newDispatch).toBeInstanceOf(Function);

      let index: number = 0;
      for (const iteratorResult of dispatch) {
        if (index === 0) {
          expect(iteratorResult).toBe(value);
        }
        else if (index === 1) {
          expect(iteratorResult).toBe(newDispatch);
        }
        else {
          throw new Error('Iterable contains too many results.');
        }
        index++;
      }
    });

    describe('iterator\'s dispatch', (): void => {

      let iteratorDispatch: Dispatcher<G, A>;
      beforeEach((): void => {
        testUseDispatch.render(REDUCER, PROPERTY);
        [ , iteratorDispatch ] = testUseDispatch.value;
      });
  
      it(
        'should return a Promise of the new global state',
        async (): Promise<void> => {
          const reduce: Promise<G> = iteratorDispatch(...ARGS);
          expect(reduce).toBeInstanceOf(Promise);
          const value: G = await reduce;
          expect(value).toEqual(NEW_STATE);
        }
      );
  
      it('should call GlobalStateManager.set', async (): Promise<void> => {
        await dispatch(...ARGS);
        expect(spy.set).toHaveBeenCalledTimes(1);
        expect(spy.set).toHaveBeenCalledWith(STATE_CHANGE, REDUCER.name, ARGS);
      });

    });
  });

});
