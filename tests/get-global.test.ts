import { expect } from 'chai';
import GlobalStateManager from '../src/global-state-manager';
import getGlobal from '../src/helpers/get-global';
import { GS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



describe('getGlobal', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('state');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 1 argument', (): void => {
    expect(getGlobal).to.be.a('function');
    expect(getGlobal.length).to.equal(1);
  });

  it('should call GlobalStateManager.state', (): void => {
    getGlobal(globalStateManager);
    expect(spy.state.calledOnceWithExactly()).to.equal(true);
  });

  it('should return a copy of the state', (): void => {
    const state: GS = getGlobal(globalStateManager);
    expect(state).to.deep.equal(INITIAL_STATE);
    expect(state).not.to.equal(INITIAL_STATE);
  });
});
