/*

Convert (state, ...params) => newGlobal to (...params) => newGlobal
  and use the return value to update the global state.

Example before:
  const fake = (state, i) => ({ x: state.x + i });

Example after:
  const real = createReducer(fake);
  real(1); // global.x += 1
  real(2); // global.x += 2

*/

const defaultGlobalState = require('./default-global-state');

module.exports = function createReducer(reducer) {
  return function globalReducer(...args) {
    return defaultGlobalState.setAny(
      reducer(defaultGlobalState.stateWithReducers, ...args)
    );
  };
};
