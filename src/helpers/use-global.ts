import React from 'react';
import useForceUpdate from 'use-force-update';
import Context from '../context';
import defaultGlobalStateManager from '../default-global-state-manager';
import setGlobal from './set-global';
import makeIterable from './utils/make-iterable';

export default function useGlobal(
  overrideGlobalState, property, setterOnly = false
) {

  // Require hooks.
  if (!React.useContext) {
    throw new Error(
      'The installed version of React does not support Hooks, ' +
      'which are required for useGlobal.'
    );
  }

  const globalState =
    overrideGlobalState || React.useContext(Context) || defaultGlobalStateManager;

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts,
  //   remove the force update listener.
  React.useEffect(() => () => {
    globalState.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (!property) {

    const globalStateSetter = (newGlobal, callback = null) => {
      setGlobal(globalState, newGlobal, callback);
    };

    if (setterOnly) {
      return globalStateSetter;
    }
    return [
      globalState.spyStateWithReducers(forceUpdate),
      globalStateSetter
    ];
  }

  // Use a custom reducer.
  if (typeof property === 'function') {
    const reducer = globalState.createReducer(property);

    // Support [ state, dispatch ] syntax.
    makeIterable(
      reducer,
      globalState.spyStateWithReducers(forceUpdate),
      reducer
    );
    return reducer;
  }

  // Use a global reducer.
  if (globalState.hasReducer(property)) {
    return globalState.getReducer(property);
  }

  const globalPropertySetter = (value, callback = null) =>
  globalState.setAnyCallback(
      { [property]: value },
      callback
    );

  // Return only the setter (better performance).
  if (setterOnly) {
    return globalPropertySetter;
  }

  // Return both getter and setter.
  return [
    globalState.spyState(forceUpdate)[property],
    globalPropertySetter
  ];
};
