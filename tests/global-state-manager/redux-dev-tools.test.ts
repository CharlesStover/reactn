import {
  composeWithDevTools,
  devToolsEnhancer,
  EnhancerOptions,
} from 'redux-devtools-extension/developmentOnly';
import GlobalStateManager from '../../src/global-state-manager';
import { G, INITIAL_STATE } from '../utils/initial';
import { Window } from '../../src/utils/redux-dev-tools';



declare const global: { window: Window };

const REDUX_DEVTOOLS_OPTIONS: EnhancerOptions = {
  name: 'ReactN',
};



describe('Redux DevTools', (): void => {

  it('should not be supported by default', (): void => {
    const globalStateManager: GlobalStateManager<G> =
      new GlobalStateManager<G>(INITIAL_STATE);
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
      const globalStateManager: GlobalStateManager<G> =
        new GlobalStateManager<G>(INITIAL_STATE);
      expect(global.window.__REDUX_DEVTOOLS_EXTENSION__)
        .toHaveBeenCalledTimes(1);
      expect(global.window.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalledWith(
        REDUX_DEVTOOLS_OPTIONS,
      );
      expect(globalStateManager.reduxEnhancedStore)
        .toBeInstanceOf(Object);
      expect(globalStateManager.reduxEnhancedStore.dispatch)
        .toBeInstanceOf(Function);
    });

    it('should be called', (): void => {
      const globalStateManager: GlobalStateManager<G> =
        new GlobalStateManager<G>(INITIAL_STATE);
      const dispatch = jest.spyOn(
        globalStateManager.reduxEnhancedStore,
        'dispatch',
      );
      const STATE_CHANGE: Partial<G> = {
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
