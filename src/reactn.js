const React = require('react');
const useForceUpdate = require('use-force-update').default;
const {
  classComponentWillUnmount, classEnqueueForceUpdate,
  classGetGlobal, classSetGlobal
} = require('./class');
const globalStateManager = require('./global-state-manager');
const reducers = require('./reducers');
const { sharedGetGlobal, sharedSetGlobal } = require('./shared');



// import React from 'reactn';
// React.Component, React.PureComponent
const createReactNComponentClass = Super =>
  class ReactNComponent extends Super {

    constructor(...args) {
      super(...args);

      const proto = Object.getPrototypeOf(this);

      // this.componentWillUnmount
      const hasInstanceCWU = Object.prototype.hasOwnProperty.call(this, 'componentWillUnmount');
      const hasProtoCWU = Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount');
      if (hasInstanceCWU || hasProtoCWU) {
        const cb =
          hasInstanceCWU ?
            this.componentWillUnmount :
            proto.componentWillUnmount.bind(this);
        this.componentWillUnmount = (...a) => {
          classComponentWillUnmount(this);
          cb(...a);
        };
      }
    }

    componentWillUnmount() {
      classComponentWillUnmount(this);
    }

    _globalCallback = () => {
      classEnqueueForceUpdate(this);
    };

    get global() {
      return classGetGlobal(this);
    }

    setGlobal(global, callback = null) {
      classSetGlobal(this, global, callback);
    }
  };



// @reactn
const ReactN = function(Component) {
  class ReactNComponent extends Component {

    constructor(...args) {
      super(...args);
    }

    componentWillUnmount(...args) {
      classComponentWillUnmount(this);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount(...args);
      }
    }

    _globalCallback() {
      classEnqueueForceUpdate(this);
    }

    get global() {
      return classGetGlobal(this);
    }

    setGlobal(global, callback = null) {
      classSetGlobal(this, global, callback);
    }
  }

  // getDerivedGlobalFromProps
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = (props, ...args) => {
      const newState = Component.getDerivedGlobalFromProps(props, globalStateManager._state, ...args);
      globalStateManager.setAny(newState);

      // getDerivedStateFromProps
      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
        return Component.getDerivedStateFromProps(props, ...args);
      }
      return null;
    };
  }

  ReactNComponent.displayName = (Component.displayName || Component.name) + '-ReactN';

  return ReactNComponent;
};

Object.assign(ReactN, React, {
  addReducer: (name, reducer) => {
    reducers[name] = (...args) => {
      globalStateManager.setAny(
        reducer(globalStateManager._state, ...args)
      );
    };
  },
  Component: createReactNComponentClass(React.Component),
  default: ReactN,
  PureComponent: createReactNComponentClass(React.PureComponent),
  setGlobal: (global, callback) => globalStateManager.setAny(global, callback),
  useGlobal: key => {

    // Require v16.7
    if (!React.useState) {
      throw new Error('React v16.7 or newer is required for useGlobal.');
    }

    const forceUpdate = useForceUpdate();
    React.useEffect(() => () => {
      globalStateManager.removeKeyListener(forceUpdate);
    });

    // Use the entire global state.
    if (typeof key === 'undefined') {
      return [
        sharedGetGlobal(forceUpdate),
        (global, callback = null) => {
          sharedSetGlobal(
            global,
            callback,
            () => sharedGetGlobal(forceUpdate)
          );
        }
      ];
    }

    // Use a single key.
    return [
      sharedGetGlobal(forceUpdate)[key],
      (value, callback = null) => {
        sharedSetGlobal(
          { [key]: value },
          callback,
          () => sharedGetGlobal(forceUpdate)[key]
        );
      }
    ];
  }
});

module.exports = ReactN;
