const globalStateManager = require('../global-state-manager');

module.exports = function setGlobal(newGlobal, callback = null) {
  return globalStateManager.setAnyCallback(newGlobal, callback);
};
