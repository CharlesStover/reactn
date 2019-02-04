const defaultGlobalState = require('../default-global-state');

module.exports = function resetGlobal() {
  return defaultGlobalState.reset();
};
