/*
import { expect } from 'chai';
import GlobalStateManager from '../global-state-manager';
import addReducer from './add-reducer';

const REDUCER = (_globalState, _one, _two, _three) => { };
const REDUCER_NAME = 'reducerName';

describe('addReducer', () => {

  it('should add a reducer', () => {
    const globalStateManager = new GlobalStateManager();
    addReducer(globalStateManager, REDUCER_NAME, () => {});
    expect(globalStateManager.hasReducer(REDUCER_NAME));
  });

  it('should make it a global reducer', () => {
    const globalStateManager = new GlobalStateManager();
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(globalStateManager.getReducer(REDUCER_NAME).length)
      .to.equal(REDUCER.length - 1);
  });
});
*/
