import { expect } from 'chai';
import GlobalStateManager from '../global-state-manager';
import addReducer from './add-reducer';

const REDUCER = (_globalState, _one, _two, _three): void => { };
const REDUCER_NAME = 'reducerName';

describe('addReducer', () => {

  it('should add a reducer', () => {
    const globalStateManager = new GlobalStateManager();
    addReducer(globalStateManager, REDUCER_NAME, () => {});
    expect(globalStateManager.hasReducer(REDUCER_NAME));
  });

  // GlobalReducers currently have a length of 0 because they use
  //   `...args: any[]` as their parameter definition.
  // TODO: Some sort of localReducer.bind(null, globalState)
  it.skip('should make it a global reducer', () => {
    const globalStateManager = new GlobalStateManager();
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(globalStateManager.getReducer(REDUCER_NAME).length)
      .to.equal(REDUCER.length - 1);
  });
});
