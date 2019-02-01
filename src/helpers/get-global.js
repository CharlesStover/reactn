const globalStateManager = require('../global-state-manager');

module.exports = function getGlobal() {
  return globalStateManager.stateWithReducers;
};
