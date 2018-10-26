const React = require('react');
const globalStateManager = require('./global-state-manager').default;

const reducers = Object.create(null);



const componentWillUnmount = _this => {

  // No longer re-render this component on global state change.
  globalStateManager.removeListeners(_this._globalCallback);
};

const enqueueForceUpdate = _this => {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
};

const getGlobal = _this => {
  return Object.assign(
    globalStateManager.state(_this._globalCallback),
    reducers
  );
};

const setGlobal = (global, callback, _this = null) => {
  const newGlobal = globalStateManager.setAny(global);
  if (typeof callback === 'function') {
    const final = () => {
      if (_this) {
        callback(_this.global);
      }
      else {
        callback();
      }
    };
    if (newGlobal instanceof Promise) {
      newGlobal.then(final);
    }
    else {
      final();
    }
  }
};



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
          componentWillUnmount(this);
          cb(...a);
        };
      }
    }

    componentWillUnmount() {
      componentWillUnmount(this);
    }

    _globalCallback() {
      enqueueForceUpdate(this);
    }

    get global() {
      return getGlobal(this);
    }

    setGlobal(global, callback = null) {
      setGlobal(global, callback, this);
    }
  };

// @reactn
const ReactN = function(Component) {
  class ReactNComponent extends Component {

    constructor(...args) {
      super(...args);
    }

    componentWillUnmount(...args) {
      componentWillUnmount(this);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount(...args);
      }
    }

    _globalCallback() {
      enqueueForceUpdate(this);
    }

    get global() {
      return getGlobal(this);
    }

    setGlobal(global, callback = null) {
      setGlobal(global, callback, this);
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
  setGlobal: g => globalStateManager.setAny(g),
  useGlobal: key => {
    return [

    ];
  }
});

module.exports = ReactN;
