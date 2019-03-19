import * as React from 'react';
import useForceUpdate from 'use-force-update';
import Context from '../context';
import defaultGlobalStateManager from '../default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import Callback from '../typings/callback';
import setGlobal from './set-global';
import makeIterable from './utils/make-iterable';

type RSA = Record<string, any>;
export type StateTuple<GS extends RSA, P extends keyof GS> = [
  GS[P],
  (newValue: GS[P]) => Promise<GS>,
];

export default function useGlobal<
  GS extends {}, // = Record<string, any>,
  Property extends keyof GS,
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
  property?: Property,
  setterOnly: boolean = false,
): StateTuple<GS, Property> {

  // Require hooks.
  if (!React.useContext) {
    throw new Error(
      'The installed version of React does not support Hooks, ' +
      'which are required for useGlobal.'
    );
  }

  const globalStateManager: GlobalStateManager<GS> =
    overrideGlobalStateManager ||
    (React.useContext(Context) as GlobalStateManager<GS>) ||
    (defaultGlobalStateManager as GlobalStateManager<GS>);

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts,
  //   remove the force update listener.
  React.useEffect(() => () => {
    globalStateManager.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (typeof property === 'undefined') {

    const globalStateSetter = (
      newGlobal: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> =>
      setGlobal(globalStateManager, newGlobal, callback);

    if (setterOnly) {
      return globalStateSetter;
    }
    return [
      globalStateManager.spyState(forceUpdate),
      globalStateSetter,
    ];
  }

  // Use a custom reducer.
  if (typeof property === 'function') {
    const reducer = globalStateManager.createReducer(property);

    // Support [ state, dispatch ] syntax.
    makeIterable(
      reducer,
      globalStateManager.spyState(forceUpdate),
      reducer
    );
    return reducer;
  }

  // Use a global reducer.
  if (globalStateManager.hasReducer(property)) {
    return globalStateManager.getReducer(property);
  }

  const globalPropertySetter = (
    value: GS[Property],
    callback: Callback<GS> | null = null,
  ): Promise<GS> =>
    callback ?
      globalStateManager.set({ [property]: value })
        .then(callback) :
        globalStateManager.set({ [property]: value });

  // Return only the setter (better performance).
  if (setterOnly) {
    return globalPropertySetter;
  }

  // Return both getter and setter.
  return [
    globalStateManager.spyState(forceUpdate)[property],
    globalPropertySetter,
  ];
};
