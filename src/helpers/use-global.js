import React from 'react';
import useForceUpdate from 'use-force-update';
import createReducer from '../create-reducer';
import defaultGlobalState from '../default-global-state';
import setGlobal from './set-global';

export default function useGlobal(property, setterOnly = false) {

  // Require hooks.
  if (!React.useState) {
    throw new Error(
      'The installed version of React does not support Hooks, ' +
      'which are required for useGlobal.'
    );
  }

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts, remove the force update listener.
  React.useEffect(() => () => {
    defaultGlobalState.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (!property) {

    const globalStateSetter = (newGlobal, callback = null) => {
      setGlobal(newGlobal, callback);
    };

    if (setterOnly) {
      return globalStateSetter;
    }
    return [
      defaultGlobalState.spyStateWithReducers(forceUpdate),
      globalStateSetter
    ];
  }

  // Use a custom reducer.
  if (typeof property === 'function') {
    return createReducer(property);
  }

  // Use a global reducer.
  if (defaultGlobalState.hasReducer(property)) {
    return defaultGlobalState.getReducer(property);
  }

  const globalPropertySetter = (value, callback = null) =>
    defaultGlobalState.setAnyCallback(
      { [property]: value },
      callback
    );

  // Return only the setter (better performance).
  if (setterOnly) {
    return globalPropertySetter;
  }

  // Return both getter and setter.
  return [
    defaultGlobalState.spyState(forceUpdate)[property],
    globalPropertySetter
  ];
};
