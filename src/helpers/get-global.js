const defaultGlobalState = require('../default-global-state');

module.exports = function getGlobal() {
  return defaultGlobalState.stateWithReducers;
};
