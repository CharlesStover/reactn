import GlobalStateManager from '../../src/global-state-manager';
import Reducer from '../../typings/reducer';



// Since interfaces can be augmented by additional declarations, D must be a
//   a type in order to be compared to index signatures as opposed to having an
//   index signature of its own.
// https://github.com/Microsoft/TypeScript/issues/15300#issuecomment-332366024
export type D = {
  append(...args: string[]): Promise<G>;
  increment(i: number): Promise<G>;
  reset(): Promise<G>;
  toggle(): Promise<G>;
};



export interface G {
  x: boolean;
  y: number;
  z: string;
}



export function createInitialDispatchers(
  globalStateManager: GlobalStateManager,
): D {
  return Object.entries(INITIAL_REDUCERS).reduce(
    (dispatchers: D, [ name, reducer ]: [ string, Reducer<G, R, any> ]) => {
      dispatchers[name] = globalStateManager.createDispatcher(reducer);
      return dispatchers;
    },
    Object.create(null),
  );
};



export const INITIAL_REDUCERS: R = {

  append: (global: G, _dispatch: D, ...args: string[]): Partial<G> => ({
    z: global.z + args.join(''),
  }),

  increment: (global: G, _dispatch: D, i: number): Partial<G> => ({
    y: global.y + i,
  }),

  reset: () => INITIAL_STATE,

  toggle: (global: G): Partial<G> => ({
    x: !global.x,
  }),
};



export const INITIAL_STATE: G = {
  x: false,
  y: 0,
  z: 'string',
};



// Since interfaces can be augmented by additional declarations, R must be a
//   a type in order to be compared to index signatures as opposed to having an
//   index signature of its own.
// https://github.com/Microsoft/TypeScript/issues/15300#issuecomment-332366024
export type R = {
  append(global: G, dispatch: D, ...args: string[]): Partial<G>;
  increment(global: G, dispatch: D, i: number): Partial<G>;
  reset(): G;
  toggle(global: G, dispatch: D): Partial<G>;
};
