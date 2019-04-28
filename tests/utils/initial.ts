export interface G {
  x: boolean;
  y: number;
  z: string;
}

export const INITIAL_STATE: G = {
  x: false,
  y: 0,
  z: 'string',
};



export const INITIAL_REDUCERS = {

  append: (gs: G, ...args: string[]) => ({
    z: gs.z + args.join(''),
  }),

  increment: (gs: G, i: number) => ({
    y: gs.y + i,
  }),

  reset: () => INITIAL_STATE,

  toggle: (gs: G) => ({
    x: !gs.x,
  }),
};

export type R = typeof INITIAL_REDUCERS;
