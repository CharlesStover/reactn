export interface GS {
  x: boolean;
  y: number;
  z: string;
}

export type R = typeof INITIAL_REDUCERS;



export const INITIAL_STATE: GS = {
  x: false,
  y: 0,
  z: 'string',
};

export const INITIAL_REDUCERS = {

  append: (gs: GS, ...args: string[]) => ({
    z: gs.z + args.join(''),
  }),

  increment: (gs: GS, i: number) => ({
    y: gs.y + i,
  }),

  reset: () => INITIAL_STATE,

  toggle: (gs: GS) => ({
    x: !gs.x,
  }),
};
