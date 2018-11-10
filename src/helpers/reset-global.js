const globalStateManager = require('../global-state-manager');

module.exports = function resetGlobal() {
  return globalStateManager.reset();
};
