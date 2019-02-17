import { expect } from 'chai';
import { getGlobal, resetGlobal } from '../index';
import createReducer from '../src/create-reducer';

describe('createReducer', () => {

  afterEach(resetGlobal);

  it('should convert a local reducer to a global reducer', () => {

    // Local reducer
    let globalState = null;
    let localArg = null;
    const localReducer = (global, arg) => {
      globalState = global;
      localArg = arg;
      return null;
    };

    // Pre-execution expectations
    expect(globalState).to.equal(null);
    expect(localArg).not.to.equal('test');
    expect(localArg).to.equal(null);

    // Global reducer
    const globalReducer = createReducer(localReducer);
    globalReducer('test');

    // Post-execution expectations
    expect(globalState).to.deep.equal(getGlobal());
    expect(localArg).not.to.equal(null);
    expect(localArg).to.equal('test');
  });

});
