const defaultGlobalState = require('../default-global-state');

module.exports = function removeCallback(f) {
  return defaultGlobalState.removeCallback(f);
};
