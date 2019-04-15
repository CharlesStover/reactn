import {
  ComponentClass,
  Context,
  createElement,
  FunctionComponent,
} from 'react';
import { State } from '../default';
import { ReactNComponent, ReactNComponentClass } from './components';
import ReactNContext from './context';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import { ReactNGlobal, ReactNSetGlobal } from './methods';
import Callback from './typings/callback';



export type Getter<G extends {}, HP, LP> = (globalState: G, props: HP) =>
  null | Partial<LP> | void;

type LowerOrderComponent<P = {}> =
  ComponentClass<P> | FunctionComponent<P> | string;

type SetGlobal<G extends {} = State> = (
  newGlobalState: NewGlobalState<G>,
  callback?: Callback<G>,
) => Promise<G>;

export type Setter<G, HP, LP> = (setGlobal: SetGlobal<G>, props: HP) =>
  null | Partial<LP> | void;

export type WithGlobal<HP, LP> =
  (Component: LowerOrderComponent<LP>) => ComponentClass<HP>;



// Get the name of a Component.
const componentName = (Component: LowerOrderComponent): string =>
  typeof Component === 'string' ?
    Component :
    Component.displayName ||
    Component.name;

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;



/*
Creates a Higher-Order Component that passes the global state
  to the wrapped Component as props.
Behaves analogously to Redux's connect() HOC.

const hoc = withGlobal(
  (global, props) => ({
    age: global.people[props.person].age,
    propName: global.property
  })
);
hoc(MyComponent);
*/
export default function withGlobal<
  G extends {} = State,
  HP extends {} = {},
  LP extends {} = {},
>(
  globalStateManager: GlobalStateManager<G> | null = null,
  getter: Getter<G, HP, LP> = (globalState: G): G => globalState,
  setter: Setter<G, HP, LP> = (): null => null,
): WithGlobal<HP, LP> {
  return function ReactNWithGlobal(
    Component: LowerOrderComponent<LP>,
  ): ReactNComponentClass<HP, {}, G> {

    // If a Global State was provided, use it.
    // Otherwise, if a Provider was mounted, use its global state.
    // Otherwise, use the default global state.

    return class ReactNHOC extends ReactNComponent<HP, {}, G> {

      // Context knows it provides a GlobalStateManager,
      //   but not the shape <GS> of the GlobalState that it holds.
      public static contextType: Context<GlobalStateManager<G>> =
        ReactNContext as Context<GlobalStateManager<G>>;

      public static displayName = `${componentName(Component)}-ReactN`;

      public get global(): G {
        return ReactNGlobal<G>(
          this,
          globalStateManager || this.context || defaultGlobalStateManager
        );
      }

      public setGlobal = (
        newGlobalState: NewGlobalState<G>,
        callback: Callback<G> = null,
      ): Promise<G> =>
        ReactNSetGlobal<G>(
          newGlobalState, callback,
          !isComponentDidMount &&
          !isComponentDidUpdate &&
          !isSetGlobalCallback,
          globalStateManager ||
          this.context ||
          defaultGlobalStateManager,
        );

      public render(): JSX.Element {

        // @ts-ignore: LP doesn't match HP
        const lowerOrderProps: LP = {
          ...this.props,
          ...getter(this.global, this.props),
          ...setter(this.setGlobal, this.props),
        };
        return createElement(Component, lowerOrderProps);
      }
    };
  };
};
