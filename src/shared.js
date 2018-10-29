const globalStateManager = require('./global-state-manager');
const reducers = require('./reducers');

module.exports = {

  sharedGetGlobal: callback =>
    Object.assign(
      globalStateManager.state(callback),
      reducers
    ),

  sharedSetGlobal: (global, callback, getCallbackParameter = null) => {
    const newGlobal = globalStateManager.setAny(global);

    // If there is a callback,
    if (typeof callback === 'function') {

      // Execute after the global state has finished setting.
      const final = () => {
        if (getCallbackParameter) {
          callback(getCallbackParameter());
        }
        else {
          callback();
        }
      };

      if (newGlobal instanceof Promise) {
        newGlobal.then(final);
      }
      else {
        final();
      }
    }
  }
};
