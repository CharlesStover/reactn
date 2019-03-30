import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



const DISPATCHER_NAME: keyof R = 'increment';



describe('GlobalStateManager.removeDispatcher', (): void => {

  let globalStateManager: GlobalStateManager<GS, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
  });



  it('should be a function with 1 argument', (): void => {
    expect(globalStateManager.removeDispatcher).to.be.a('function');
    expect(globalStateManager.removeDispatcher.length).to.equal(1);
  });

  it('remove a dispatcher', (): void => {
    expect(globalStateManager.hasDispatcher(DISPATCHER_NAME)).to.equal(true);
    globalStateManager.removeDispatcher(DISPATCHER_NAME);
    expect(globalStateManager.hasDispatcher(DISPATCHER_NAME)).to.equal(false);
  });



  describe('return value', (): void => {

    it('should be true if the dispatcher existed', (): void => {
      const removed: boolean =
        globalStateManager.removeDispatcher(DISPATCHER_NAME);
      expect(removed).to.equal(true);
    });

    it('should be false if the dispatcher did not exist', (): void => {
      const FAKE_DISPATCHER_NAME: string = 'mockDispatcher';
      const removed: boolean =
        globalStateManager.removeDispatcher(FAKE_DISPATCHER_NAME);
      expect(removed).to.equal(false);
    });
  });

});
