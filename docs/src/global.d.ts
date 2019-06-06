import 'reactn';

declare module 'reactn/default' {

  export interface Reducers {
    setColor: (
      global: State,
      dispatch: Dispatch,
      color: string,
    ) => Pick<State, 'color'>;
  }

  export interface State {
    color: string;
  }

}
