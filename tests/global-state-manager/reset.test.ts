import { expect } from 'chai';
import GlobalStateManager from '../../src/global-state-manager';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';



describe('GlobalStateManager.reset', (): void => {

  let globalStateManager: GlobalStateManager<GS, R>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS, R>(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
  });



  it('should be a function with no arguments', (): void => {
    expect(globalStateManager.reset).to.be.a('function');
    expect(globalStateManager.reset.length).to.equal(0);
  });

  it('should remove callbacks', (): void => {
    const CALLBACK = (): void => { };
    globalStateManager.addCallback(CALLBACK);
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(true);
    globalStateManager.reset();
    expect(globalStateManager.hasCallback(CALLBACK)).to.equal(false);
  });

  it('should reset dispatchers', (): void => {
    const REDUCER = (): null => null;
    const REDUCER_NAME = 'reducerName';

    globalStateManager.addDispatcher(REDUCER_NAME, REDUCER);
    expect(globalStateManager.hasDispatcher('increment')).to.equal(true);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(true);
    globalStateManager.reset();
    expect(globalStateManager.hasDispatcher('increment')).to.equal(true);
    expect(globalStateManager.hasDispatcher(REDUCER_NAME)).to.equal(false);
  });

  it('should remove property listeners', (): void => {
    const PROPERTY: keyof GS = 'x';
    const PROPERTY_LISTENER = (): void => { };
    globalStateManager.addPropertyListener(PROPERTY, PROPERTY_LISTENER);
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(true);
    globalStateManager.reset();
    expect(globalStateManager.hasPropertyListener(PROPERTY_LISTENER))
      .to.equal(false);
  });

  it('should empty the queue', (): void => {
    globalStateManager.enqueue('x', true);
    expect(globalStateManager.queue.size).to.equal(1);
    globalStateManager.reset();
    expect(globalStateManager.queue.size).to.equal(0);
  });

  it('should reset the state', async (): Promise<void> => {
    await globalStateManager.set({
      x: true,
      y: 1,
      z: 'any',
    });
    expect(globalStateManager.state).not.to.deep.equal(INITIAL_STATE);
    globalStateManager.reset();
    expect(globalStateManager.state).to.deep.equal(INITIAL_STATE);
  });

  it('should not return anything', (): void => {
    expect(globalStateManager.reset()).to.be.undefined;
  });
});
