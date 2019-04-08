import {
  composeWithDevTools,
  devToolsEnhancer,
} from 'redux-devtools-extension/developmentOnly';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_STATE } from '../utils/initial';



interface ReduxDevTools {
  __REDUX_DEVTOOLS_EXTENSION__: typeof devToolsEnhancer;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof composeWithDevTools;
}



declare const window: ReduxDevTools;



describe('Redux DevTools', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should not be supported by default', (): void => {
    expect(globalStateManager.reduxDevTools).toBe(null);
  });



  describe('with extension', (): void => {

    beforeEach((): void => {
      window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn(devToolsEnhancer);
      /*
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
        jest.fn(composeWithDevTools);
      */
    });

    afterEach((): void => {
      delete window.__REDUX_DEVTOOLS_EXTENSION__;
      // delete window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    });
  
    it('should exist', (): void => {
      expect(globalStateManager.reduxDevTools).toBeInstanceOf(Function);
    });

    it('should be called', (): void => {
      const STATE_CHANGE: Partial<GS> = {
        x: true,
      };
      globalStateManager.set(STATE_CHANGE);
      expect(window.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalledTimes(1);
      expect(window.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalledWith({
        stateChange: STATE_CHANGE,
        type: 'STATE_CHANGE',
      });
    });
  });

});
