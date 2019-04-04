import * as React from 'react';
import useForceUpdate from 'use-force-update';
import Context from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import setGlobal from './set-global';
import Callback from './typings/callback';



export type GlobalTuple<GS> = [
  GS,
  (newGlobalState: NewGlobalState<GS>) => Promise<GS>,
];

export type Setter<GS extends {}, P extends keyof GS> =
  (newValue: GS[P]) => Promise<GS>;

export type StateTuple<GS extends {}, P extends keyof GS> = [
  GS[P],
  Setter<GS, P>,
];

export type UseGlobal<GS extends {}, Property extends keyof GS> =
  GlobalTuple<GS> | Setter<GS, Property> | StateTuple<GS, Property>;

type VoidFunction = () => void;



export const REACT_HOOKS_ERROR = new Error(
  'The installed version of React does not support Hooks, ' +
  'which are required for useGlobal.'
);



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
  setterOnly?: false,
): StateTuple<GS, Property>;

// useGlobal('property', true)
export default function useGlobal<
  GS extends {}, // = {}
  Property extends keyof GS,
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
  property: Property,
  setterOnly: true,
): Setter<GS, Property>;

export default function useGlobal<
  GS extends {}, // = {}
  Property extends keyof GS,
>(
  overrideGlobalStateManager: GlobalStateManager<GS> | null,
  property?: Property,
  setterOnly: boolean = false,
): UseGlobal<GS, Property> {

  // Require hooks.
  if (!React.useContext) {
    throw REACT_HOOKS_ERROR;
  }

  const globalStateManager: GlobalStateManager<GS> =
    overrideGlobalStateManager ||
    (React.useContext(Context) as GlobalStateManager<GS>) ||
    (defaultGlobalStateManager as GlobalStateManager<GS>);

  const forceUpdate = useForceUpdate();

  // If this component ever updates or unmounts,
  //   remove the force update listener.
  React.useEffect((): VoidFunction => (): void => {
    globalStateManager.removePropertyListener(forceUpdate);
  });

  // Return the entire global state.
  if (typeof property === 'undefined') {

    const globalStateSetter = (
      newGlobalState: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> =>
      setGlobal(globalStateManager, newGlobalState, callback);

    /*
    // useGlobal(undefined, true) is just setGlobal...
    if (setterOnly) {
      return globalStateSetter;
    }
    */
    return [
      globalStateManager.spyState(forceUpdate),
      globalStateSetter,
    ];
  }

  // Use a custom reducer.
  /*
  if (typeof property === 'function') {
    const dispatcher: Dispatcher<typeof property> =
      globalStateManager.createDispatcher(property);

    // Support [ state, dispatch ] syntax.
    makeIterable(
      dispatcher,
      globalStateManager.spyState(forceUpdate),
      dispatcher,
    );
    return dispatcher;
  }
  */

  // Use a global reducer.
  /*
  // TODO: useGlobalReducer('reducerName')
  if (globalStateManager.hasReducer(property)) {
    return globalStateManager.getReducer(property);
  }
  */

  const globalPropertySetter = (
    value: GS[Property],
    callback: Callback<GS> | null = null,
  ): Promise<GS> => {
    const newGlobalState: Partial<GS> = Object.create(null);
    newGlobalState[property] = value;
    return setGlobal(globalStateManager, newGlobalState, callback);
  };

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
