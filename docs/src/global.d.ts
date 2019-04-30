import reactn from 'reactn';

declare module 'reactn/default' {

  interface Reducers {
    setColor: (
      global: State,
      dispatch: Dispatch,
      color: string,
    ) => Pick<State, 'color'>;
  }

  interface State {
    color: string;
  }

}
