const createReducer = require('../src/create-reducer');

describe('createReducer', () => {

  it('should convert a local reducer to a global reducer', () => {

    // Local reducer
    let localArg = null;
    const localReducer = (_, arg) => {
      localArg = arg;
      return null;
    };

    // Pre-execution expectations
    expect(localArg).not.to.equal('test');
    expect(localArg).to.equal(null);

    // Global reducer
    const globalReducer = createReducer(localReducer);
    globalReducer('test');

    // Post-execution expectations
    expect(localArg).not.to.equal(null);
    expect(localArg).to.equal('test');
  });

});
