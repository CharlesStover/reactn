import GlobalStateManager from '../../src/global-state-manager';
import Middleware from '../../typings/middleware';
import { G } from '../utils/initial';



const MIDDLEWARE: Middleware<G> = (state: G): G => state;
const MIDDLEWARE_CREATOR = (): Middleware<G> => MIDDLEWARE;



describe('GlobalStateManager.removeMiddleware', (): void => {

  let globalStateManager: GlobalStateManager<G>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G>();
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removeMiddleware).toBeInstanceOf(Function);
    expect(globalStateManager.removeMiddleware).toHaveLength(1);
  });

  it('remove a middleware', (): void => {
    globalStateManager.addMiddleware(MIDDLEWARE_CREATOR);
    expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(true);
    globalStateManager.removeMiddleware(MIDDLEWARE);
    expect(globalStateManager.hasMiddleware(MIDDLEWARE)).toBe(false);
  });



  describe('return value', (): void => {

    it('should be true if the middleware existed', (): void => {
      globalStateManager.addMiddleware(MIDDLEWARE_CREATOR);
      const removed: boolean = globalStateManager.removeMiddleware(MIDDLEWARE);
      expect(removed).toBe(true);
    });

    it('should be false if the middleware did not exist', (): void => {
      const removed: boolean = globalStateManager.removeMiddleware(MIDDLEWARE);
      expect(removed).toBe(false);
    });
  });

});
