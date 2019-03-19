// import { expect } from 'chai';
// import GlobalStateManager from './global-state-manager';

interface CreateReducer {
  x: number;
  y: number;
  z: number;
}

/*
describe('createReducer', () => {

  it('should convert a local reducer to a global reducer', () => {
    const globalStateManager = new GlobalStateManager<CreateReducer>({
      x: 1,
      y: 2,
      z: 3,
    });

    // Local reducer
    const localReducer = (globalState, x, y) => ({
      ...globalState,
      x,
      y,
    });

    // Pre-execution expectations
    expect(globalStateManager.state.x).to.equal(1);
    expect(globalStateManager.state.y).to.equal(2);
    expect(globalStateManager.state.z).to.equal(3);

    // Global reducer
    const globalReducer =
      globalStateManager.createReducer(localReducer);
    globalReducer(11, 12)

    // Post-execution expectations
    expect(globalStateManager.state.x).to.equal(11);
    expect(globalStateManager.state.y).to.equal(12);
    expect(globalStateManager.state.z).to.equal(3);
  });

});
*/
