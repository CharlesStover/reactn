import * as React from 'react';
import { Reducers, State } from '../default';
import Callback from '../types/callback';
import { ReactNComponentClass } from '../types/component-class';
import Dispatchers from '../types/dispatchers';
import WithGlobal, { Getter, Setter } from '../types/with-global';
import NewGlobalState from '../types/new-global-state';
import { ReactNComponent } from './components';
import ReactNContext from './context';
import GlobalStateManager from './global-state-manager';
import { ReactNGlobal, ReactNSetGlobal } from './methods';
import getGlobalStateManager from './utils/get-global-state-manager';



// Get the name of a Component.
const componentName = <
  P extends {} = {},
>(Component: React.ComponentType<P> | string): string =>
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
export default function _withGlobal<
  G extends {} = State,
  R extends {} = Reducers,
  HP extends {} = {},
  LP extends {} = {},
>(
  globalStateManager: GlobalStateManager<G, R> | null = null,
  getter: Getter<G, R, HP, LP> = (global: G): G => global,
  setter: Setter<G, R, HP, LP> = (): null => null,
): WithGlobal<HP, LP> {
  return function ReactNWithGlobal(
    Component: React.ComponentType<LP> | string,
  ): ReactNComponentClass<HP, {}, G> {

    // If a Global State was provided, use it.
    // Otherwise, if a Provider was mounted, use its global state.
    // Otherwise, use the default global state.

    return class ReactNWithGlobalHoc extends ReactNComponent<HP, {}, G> {

      // Context knows it provides a GlobalStateManager, but not the shape.
      public static contextType: React.Context<GlobalStateManager<G, R>> =
        ReactNContext;

      public static displayName = `${componentName(Component)}-ReactN`;

      // Context knows it provides a GlobalStateManager, but not the shape.
      public context: GlobalStateManager<G, R>;

      public get dispatch(): Dispatchers<G, R> {
        return this.globalStateManager.dispatchers;
      }

      public get global(): G {
        return ReactNGlobal<G>(this, this.globalStateManager);
      }

      public get globalStateManager(): GlobalStateManager<G, R> {
        if (globalStateManager) {
          return globalStateManager;
        }
        if (this.context instanceof GlobalStateManager) {
          return this.context;
        }
        return getGlobalStateManager<G, R>();
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
          this.globalStateManager,
        );

      public render(): JSX.Element {

        // @ts-ignore: LP doesn't match HP
        const lowerOrderProps: LP = {
          ...this.props,
          ...getter(this.global, this.dispatch, this.props),
          ...setter(this.setGlobal, this.dispatch, this.props),
        };
        return <Component {...lowerOrderProps} />;
      }
    };
  };
};
