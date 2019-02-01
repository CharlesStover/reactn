const globalStateManager = require('../global-state-manager');

module.exports = function removeCallback(f) {
  return globalStateManager.removeCallback(f);
};
