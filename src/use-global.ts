import { useContext, useEffect } from 'react';
import useForceUpdate from 'use-force-update';
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

type Setter<GS extends {}, P extends keyof GS> =
  (newValue: GS[P], callback?: Callback<GS>) => Promise<GS>;

export type StateTuple<GS extends {}, P extends keyof GS> = [
  GS[P],
  Setter<GS, P>,
];

export type UseGlobal<GS extends {}, Property extends keyof GS> =
  GlobalTuple<GS> | StateTuple<GS, Property>;

type VoidFunction = () => void;







// useGlobal()
export default function useGlobal<
  GS extends {} = {},
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
): GlobalTuple<GS>;

// useGlobal('property')
export default function useGlobal<
  GS extends {}, // = {}
  Property extends keyof GS,
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
  property: Property,
): StateTuple<GS, Property>;

// Implementation
export default function useGlobal<
  GS extends {} = {},
  Property extends keyof GS = keyof GS,
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
  property?: Property,
): UseGlobal<GS, Property> {

  // Require hooks.
  if (!useContext) {
    throw REACT_HOOKS_ERROR;
  }

  const globalStateManager: GlobalStateManager<GS> =
    overrideGlobalStateManager ||
    (useContext(Context) as GlobalStateManager<GS>) ||
    (defaultGlobalStateManager as GlobalStateManager<GS>);

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts,
  //   remove the force update listener.
  useEffect((): VoidFunction => (): void => {
    globalStateManager.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (typeof property === 'undefined') {

    const globalStateSetter = (
      newGlobalState: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> =>
      setGlobal(globalStateManager, newGlobalState, callback);

    return [
      globalStateManager.spyState(forceUpdate),
      globalStateSetter,
    ];
  }

  const globalPropertySetter = (
    value: GS[Property],
    callback: Callback<GS> | null = null,
  ): Promise<GS> => {
    const newGlobalState: Partial<GS> = Object.create(null);
    newGlobalState[property] = value;
    return setGlobal(globalStateManager, newGlobalState, callback);
  };

  // Return both getter and setter.
  return [
    globalStateManager.spyState(forceUpdate)[property],
    globalPropertySetter,
  ];
};
