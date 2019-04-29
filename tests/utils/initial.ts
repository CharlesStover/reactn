export interface D {
  append(...args: string[]): Promise<G>;
  increment(i: number): Promise<G>;
  reset(): Promise<G>;
  toggle(): Promise<G>;
}



export interface G {
  x: boolean;
  y: number;
  z: string;
}



export const INITIAL_DISPATCHERS: D = {
  append: null,
  increment: null,
  reset: null,
  toggle: null,
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



export interface R {
  append(global: G, dispatch: D, ...args: string[]): Partial<G>;
  increment(global: G, dispatch: D, i: number): Partial<G>;
  reset(): G;
  toggle(global: G, dispatch: D): Partial<G>;
}
