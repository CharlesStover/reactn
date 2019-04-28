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
    expect(globalStateManager.reduxEnhancedStore).toBe(null);
  });



  describe('with extension', (): void => {

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
      expect(globalStateManager.reduxEnhancedStore)
        .toBeInstanceOf(Object);
      expect(globalStateManager.reduxEnhancedStore.dispatch)
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
                dispatch,
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
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          stateChange: STATE_CHANGE,
          type: 'STATE_CHANGE',
        });
      });
    });
  });

});
