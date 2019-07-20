import * as React from 'react';
import { Reducers, State } from '../default';
import { ReactNComponentClass } from '../types/component-class';
import NewGlobalState from '../types/new-global-state';
import WithInit, { WithInitState } from '../types/with-init';
import addReducers from './add-reducers';
import { ReactNComponent } from './components';
import defaultGlobalStateManager from './default-global-state-manager';

export default function _withInit<
  G extends {} = State,
  R extends {} = Reducers,
  P extends {} = {},
>(
  initialGlobal: NewGlobalState<G> | null = null,
  initialReducers: null | R = null,
): WithInit<P, G, R> {
  return function ReactNWithInit(
    Component: React.ComponentType<P> | string,
    FallbackComponent: null | React.ComponentType<P> | string = null,
  ): ReactNComponentClass<P, WithInitState, G, R> {
    return class ReactNWithInitHoc extends ReactNComponent<P, WithInitState, G, R> {

      state: WithInitState = {
        global: !Boolean(initialGlobal),
        reducers: !Boolean(initialReducers),
      };

      public componentDidMount(): void {

        // If there is an initial global state, set it.
        if (initialGlobal) {
          this.setGlobal(
            initialGlobal,
            (): void => {
              this.setState({ global: true });
            },
          );
        }

        // If there are initial reducers, add them.
        if (initialReducers) {

          // Reducers only need to worry about being added to the default
          //   global state manager. Providers will have their reducers set
          //   when they are created.
          addReducers(defaultGlobalStateManager, initialReducers);
          this.setState({ reducers: true });
        }
      }
      render() {
        if (
          !this.state.global ||
          !this.state.reducers
        ) {
          if (FallbackComponent) {
            return <FallbackComponent {...this.props} />;
          }
          return null;
        }

        return <Component {...this.props} />;
      }
    };
  };
}
