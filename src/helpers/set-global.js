const defaultGlobalState = require('../default-global-state');

module.exports = function setGlobal(newGlobal, callback = null) {
  return defaultGlobalState.setAnyCallback(newGlobal, callback);
};
