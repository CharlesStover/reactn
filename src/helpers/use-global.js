const React = require('react');
const useForceUpdate = require('use-force-update').default;
const createReducer = require('../create-reducer');
const globalStateManager = require('../global-state-manager');
const reducers = require('../reducers');
const setGlobal = require('./set-global');

module.exports = function useGlobal(property, setterOnly = false) {

  // Require v16.7
  if (!React.useState) {
    throw new Error('React v16.7 or newer is required for useGlobal.');
  }

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts, remove the force update listener.
  React.useEffect(() => () => {
    globalStateManager.removeKeyListener(forceUpdate);
  });

  // Return the entire global state.
  if (!property) {

    const globalStateSetter = (newGlobal, callback = null) => {
      setGlobal(
        newGlobal,
        callback,
        () => globalStateManager.stateWithReducers
      );
    };

    if (setterOnly) {
      return globalStateSetter;
    }
    return [
      globalStateManager.spyStateWithReducers(forceUpdate),
      globalStateSetter
    ];
  }

  // Use a custom reducer.
  if (typeof property === 'function') {
    return createReducer(property);
  }

  // Use a global reducer.
  if (Object.prototype.hasOwnProperty.call(reducers, property)) {
    return reducers[property];
  }

  const globalPropertySetter = (value, callback = null) =>
    globalStateManager.setAnyCallback(
      { [property]: value },
      callback
    );

  // Return only the setter (better performance).
  if (setterOnly) {
    return globalPropertySetter;
  }

  // Return both getter and setter.
  return [
    globalStateManager.spyState(forceUpdate)[property],
    globalPropertySetter
  ];
};
