const globalStateManager = require('../global-state-manager');

module.exports = function addCallback(f) {
  return globalStateManager.addCallback(f);
};
