import { createElement } from 'react';
import { ReactNPureComponent } from '../components';
import Context from '../context';
import { ReactNGlobal, ReactNSetGlobal } from '../methods';

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

export default function withGlobal(
  overrideGlobalState = null,
  getter = global => global,
  setter = () => null
) {
  return function ReactNWithGlobal(Component) {
    return class ReactNComponent extends ReactNPureComponent {

      static contextType = Context;

      static displayName =
        (Component.displayName || Component.name) + '-ReactN';

      get global() {
        return ReactNGlobal(
          this,
          overrideGlobalState || this.context || defaultGlobalState
        );
      }

      setGlobal = (newGlobal, callback = null) =>
        ReactNSetGlobal(
          this, newGlobal, callback,
          !isComponentDidMount &&
          !isComponentDidUpdate &&
          !isSetGlobalCallback,
          overrideGlobalState || this.context || defaultGlobalState
        );

      render() {

        // If a Global State was provided, use it.
        // Otherwise, if a Provider was mounted, use its global state.
        // Otherwise, use the default global state.
        return createElement(
          Component, {
            ...this.props,
            ...getter(this.global, this.props),
            ...setter(this.setGlobal, this.props)
          }
        );
      }
    };
  };
};
