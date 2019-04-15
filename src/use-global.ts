import { useContext, useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import { State } from '../default';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import setGlobal from './set-global';
import Callback from './typings/callback';
import REACT_HOOKS_ERROR from './utils/react-hooks-error';



export type GlobalTuple<GS> = [
  GS,
  (newGlobalState: NewGlobalState<GS>, callback?: Callback<GS>) => Promise<GS>,
];

type Setter<G extends {}, P extends keyof G> =
  (newValue: G[P], callback?: Callback<G>) => Promise<G>;

export type StateTuple<G extends {}, P extends keyof G> = [
  G[P],
  Setter<G, P>,
];

export type UseGlobal<G extends {}, Property extends keyof G> =
  GlobalTuple<G> | StateTuple<G, Property>;

type VoidFunction = () => void;







// useGlobal()
export default function useGlobal<G extends {} = State>(
  overrideGlobalStateManager: GlobalStateManager<G> | null,
): GlobalTuple<G>;

// useGlobal('property')
export default function useGlobal<
  G extends {} = State,
  Property extends keyof G = keyof G,
>(
  overrideGlobalStateManager: GlobalStateManager<G> | null,
  property: Property,
): StateTuple<G, Property>;

// Implementation
export default function useGlobal<
  G extends {} = State,
  Property extends keyof G = keyof G,
>(
  overrideGlobalStateManager: GlobalStateManager<G> | null,
  property?: Property,
): UseGlobal<G, Property> {

  // Require hooks.
  if (!useContext) {
    throw REACT_HOOKS_ERROR;
  }

  const globalStateManager: GlobalStateManager<G> =
    overrideGlobalStateManager ||
    (useContext(Context) as GlobalStateManager<G>) ||
    (defaultGlobalStateManager as GlobalStateManager<G>);

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts,
  //   remove the force update listener.
  useEffect((): VoidFunction => (): void => {
    globalStateManager.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (typeof property === 'undefined') {

    const globalStateSetter = (
      newGlobalState: NewGlobalState<G>,
      callback: Callback<G> | null = null,
    ): Promise<G> =>
      setGlobal(globalStateManager, newGlobalState, callback);

    return [
      globalStateManager.spyState(forceUpdate),
      globalStateSetter,
    ];
  }

  const globalPropertySetter = (
    value: G[Property],
    callback: Callback<G> | null = null,
  ): Promise<G> => {
    const newGlobalState: Partial<G> = Object.create(null);
    newGlobalState[property] = value;
    return setGlobal(globalStateManager, newGlobalState, callback);
  };

  // Return both getter and setter.
  return [
    globalStateManager.spyState(forceUpdate)[property],
    globalPropertySetter,
  ];
};
