const { createElement } = require('react');
const { ReactNPureComponent } = require('../components');

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

module.exports = function withGlobal(getGlobal = global => global, setGlobal = () => null) {
  return function ReactNWithGlobal(Component) {
    return class ReactNComponent extends ReactNPureComponent {

      static displayName = (Component.displayName || Component.name) + '-ReactN';

      render() {
        return createElement(
          Component, {
            ...this.props,
            ...getGlobal(this.global, this.props),
            ...setGlobal(this.setGlobal, this.props)
          }
        );
      }
    };
  };
};
