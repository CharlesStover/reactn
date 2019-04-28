import GlobalStateManager from '../../src/global-state-manager';
import { Dispatcher } from '../../src/typings/reducer';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('GlobalStateManager.getDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<G, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.getDispatcher).toBeInstanceOf(Function);
    expect(globalStateManager.getDispatcher).toHaveLength(1);
  });

  it('should return a dispatcher if one exists', (): void => {
    const dispatcher: Dispatcher<G, string[]> =
      globalStateManager.getDispatcher('append');
    expect(dispatcher).toBeInstanceOf(Function);
  });

  it('should throw an error if the dispatcher does not exist', (): void => {
    expect(() => {
      // @ts-ignore: Deliberately throwing an error.
      globalStateManager.getDispatcher('ANY');
    }).toThrow();
  });
});
