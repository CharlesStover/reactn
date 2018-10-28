const globalStateManager = require('./global-state-manager').default;

const reducers = require('./reducers').default;

export const sharedGetGlobal = callback =>
  Object.assign(
    globalStateManager.state(callback),
    reducers
  );

export const sharedSetGlobal = (global, callback, getCallbackParameter = null) => {
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
};
