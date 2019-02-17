import { Component, PureComponent } from 'react';
import {
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
} from './methods';

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// this.componentWillUnmount on instance
const componentWillMountInstance = _this => {
  if (Object.prototype.hasOwnProperty.call(_this, 'componentWillUnmount')) {
    const instanceCwu = _this.componentWillUnmount;
    _this.componentWillUnmount = (...a) => {
      ReactNComponentWillUnmount(_this);
      instanceCwu(...a);
    };
    return true;
  }
  return false;
};

// this.componentWillUnmount on prototype
const componentWillMountPrototype = _this => {
  const proto = Object.getPrototypeOf(_this);
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount')) {
    _this.componentWillUnmount = (...a) => {
      ReactNComponentWillUnmount(_this);
      proto.componentWillUnmount.bind(_this)(...a);
    };
  }
};

// import React from 'reactn';
// React.Component, React.PureComponent
const createReactNClassComponent = Super =>
  class ReactNComponent extends Super {

    constructor(...args) {
      super(...args);

      // this.componentWillUnmount on instance
      if (
        !componentWillMountInstance(this) &&
        !componentWillMountPrototype(this)
      ) {

        // Hack:
        // If we didn't find componentWillMount on the instance, attempt to
        //   find it again after the sub class finishes its constructor.
        // Disabled because it makes me uncomfortable and doesn't pass
        //   synchronous unit tests anyway.
        /*
        setTimeout(() => {
          componentWillMountInstance(this);
        }, 0);
        */
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
      return ReactNSetGlobal(
        this, newGlobal, callback,
        !isComponentDidMount &&
        !isComponentDidUpdate &&
        !isSetGlobalCallback
      );
    }
  };

export const ReactNComponent = createReactNClassComponent(Component);
export const ReactNPureComponent = createReactNClassComponent(PureComponent);
