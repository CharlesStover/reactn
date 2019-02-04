const defaultGlobalState = require('../default-global-state');

module.exports = function addCallback(f) {
  return defaultGlobalState.addCallback(f);
};
