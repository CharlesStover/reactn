const { Component, PureComponent } = require('react');
const ReactNContext = require('./context');
const {
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
} = require('./methods');

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// import React from 'reactn';
// React.Component, React.PureComponent
const createReactNClassComponent = Super =>
  class ReactNComponent extends Super {

    static contextType = ReactNContext;

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
          ReactNComponentWillUnmount(this);
          cb(...a);
        };
      }
    }

    componentWillUnmount() {
      ReactNComponentWillUnmount(this);
    }

    _globalCallback = () => {
      ReactNGlobalCallback(this);
    };

    get global() {
      return ReactNGlobal(this);
    }

    setGlobal(newGlobal, callback = null) {
      ReactNSetGlobal(
        this, newGlobal, callback,
        !isComponentDidMount &&
        !isComponentDidUpdate &&
        !isSetGlobalCallback
      );
    }
  };

module.exports = {
  ReactNComponent: createReactNClassComponent(Component),
  ReactNPureComponent: createReactNClassComponent(PureComponent)
};
