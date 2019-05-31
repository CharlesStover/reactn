import 'reactn';

declare module 'reactn/default' {

  declare interface Reducers {
    setColor: (
      global: State,
      dispatch: Dispatch,
      color: string,
    ) => Pick<State, 'color'>;
  }

  declare interface State {
    color: string;
  }

}
