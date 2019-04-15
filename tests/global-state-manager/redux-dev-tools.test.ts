import {
  AnyAction as ReduxAnyAction,
  compose,
  DeepPartial as ReduxDeepPartial,
  Reducer as ReduxReducer,
  StoreEnhancer as ReduxStoreEnhancer,
  StoreEnhancerStoreCreator as ReduxStoreEnhancerStoreCreator,
} from 'redux';
import {
  composeWithDevTools,
  devToolsEnhancer,
  EnhancerOptions,
} from 'redux-devtools-extension/developmentOnly';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



interface ReduxDevTools {
  __REDUX_DEVTOOLS_EXTENSION__: typeof devToolsEnhancer;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (options: EnhancerOptions) =>
    typeof compose;
}



declare const global: { window: ReduxDevTools };



describe('Redux DevTools', (): void => {

  it('should not be supported by default', (): void => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS>(INITIAL_STATE);
    expect(globalStateManager.reduxDevToolsDispatch).toBe(null);
  });



  describe('with extension', (): void => {

    const spy = spyOn('reduxDevToolsDispatch');

    beforeEach((): void => {
      global.window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn(devToolsEnhancer);
      global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
        jest.fn(composeWithDevTools);
    });

    afterEach((): void => {
      delete global.window.__REDUX_DEVTOOLS_EXTENSION__;
      delete global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    });
  


    it('should exist', (): void => {
      const globalStateManager: GlobalStateManager<GS> =
        new GlobalStateManager<GS>(INITIAL_STATE);
      expect(global.window.__REDUX_DEVTOOLS_EXTENSION__)
        .toHaveBeenCalledTimes(1);
      expect(global.window.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalledWith({
        name: 'ReactN state',
      });
      expect(globalStateManager.reduxDevToolsDispatch)
        .toBeInstanceOf(Function);
    });

    describe('with mock', (): void => {

      let dispatch: <T extends ReduxAnyAction>(action: T) => T;
      beforeEach((): void => {
        dispatch = jest.fn(<T extends ReduxAnyAction>(action: T): T => action);
        global.window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn(
          (): ReduxStoreEnhancer =>
            (_next: ReduxStoreEnhancerStoreCreator) =>
              <
                S = any,
                A extends ReduxAnyAction = ReduxAnyAction,
              >(
                _reducer: ReduxReducer<S, A>,
                _preloadedState: ReduxDeepPartial<S>,
              ) => ({
                dispatch: dispatch,
                getState: (): any => this.state,
                replaceReducer: () => null,
                subscribe: () => null,
              })
        );
      });

      it('should be called', (): void => {
        const globalStateManager: GlobalStateManager<GS> =
          new GlobalStateManager<GS>(INITIAL_STATE);
        const STATE_CHANGE: Partial<GS> = {
          x: true,
        };
        globalStateManager.set(STATE_CHANGE);
        expect(spy.reduxDevToolsDispatch).toHaveBeenCalledTimes(1);
        expect(spy.reduxDevToolsDispatch).toHaveBeenCalledWith();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          stateChange: STATE_CHANGE,
          type: 'STATE_CHANGE',
        });
      });
    });
  });

});
