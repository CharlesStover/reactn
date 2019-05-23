import GlobalStateManager from '../../src/global-state-manager';
import Middleware from '../../typings/middleware';
import { G, INITIAL_STATE } from '../utils/initial';



const MIDDLEWARE: Middleware<G> = (state: G): G => state;
const MIDDLEWARE_CREATOR = (): Middleware<G> => MIDDLEWARE;



describe('GlobalStateManager.addMiddleware', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.addMiddleware).toBeInstanceOf(Function);
    expect(globalStateManager.addMiddleware).toHaveLength(1);
  });

  it('should add a middleware', (): void => {
    expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(false);
    globalStateManager.addMiddleware(MIDDLEWARE_CREATOR);
    expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(true);
  });



  describe('return value', (): void => {

    let removeMiddleware: () => boolean;
    beforeEach((): void => {
      removeMiddleware = globalStateManager.addMiddleware(MIDDLEWARE_CREATOR);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeMiddleware).toBeInstanceOf(Function);
      expect(removeMiddleware).toHaveLength(0);
    });

    it('should remove the middleware', (): void => {
      expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(true);
      removeMiddleware();
      expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(false);
    });
  });

});
