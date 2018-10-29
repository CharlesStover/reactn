const React = require('react');
const useForceUpdate = require('use-force-update').default;
const {
  classComponentWillUnmount, classEnqueueForceUpdate,
  classGetGlobal, classSetGlobal
} = require('./class');
const globalStateManager = require('./global-state-manager');
const reducers = require('./reducers');



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
      const newState = Component.getDerivedGlobalFromProps(props, globalStateManager.stateWithReducers, ...args);
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
        reducer(globalStateManager.stateWithReducers, ...args)
      );
    };
  },
  Component: createReactNComponentClass(React.Component),
  default: ReactN,
  PureComponent: createReactNComponentClass(React.PureComponent),
  setGlobal: (global, callback = null) => globalStateManager.setAnyCallback(global, callback),
  useGlobal: (property, setterOnly = false) => {

    // Require v16.7
    if (!React.useState) {
      throw new Error('React v16.7 or newer is required for useGlobal.');
    }

    const forceUpdate = useForceUpdate();

    // If this component ever updates or unmounts, remove the force update listener.
    React.useEffect(() => () => {
      globalStateManager.removeKeyListener(forceUpdate);
    });

    // Return the entire global state.
    if (!property) {

      const globalStateSetter = (global, callback = null) => {
        setGlobal(
          global,
          callback,
          () => globalStateManager.stateWithReducers
        );
      };

      if (setterOnly) {
        return globalStateSetter;
      }
      return [
        globalStateManager.spyStateWithReducers(forceUpdate),
        globalStateSetter
      ];
    }

    // Use a reducer.
    if (typeof property === 'function') {
      return function globalReducer(...args) {
        globalStateManager.setAny(
          property(globalStateManager.stateWithReducers, ...args)
        );
      };
    }
    if (Object.prototype.hasOwnProperty.call(reducers, property)) {
      return reducers[property];
    }

    const globalPropertySetter = (value, callback = null) => {
      globalStateManager.setAnyCallback(
        { [property]: value },
        callback
      );
    };

    // Return only the setter (better performance).
    if (setterOnly) {
      return globalPropertySetter;
    }

    // Return both getter and setter.
    return [
      globalStateManager.spyState(forceUpdate)[property],
      globalPropertySetter
    ];
  }
});

module.exports = ReactN;
