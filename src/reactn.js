import React from 'react';
import componentWillUnmount from './component-will-unmount';
import getDerivedGlobalFromProps from './get-derived-global-from-props';
import globalStateManager from './global-state-manager';
import setGlobal from './set-global';

export { default as reducers } from './reducers';

const ReactN = {
  ...React,

  Component: class ReactNComponent extends React.Component {

    constructor(props) {
      super(props);
      getDerivedGlobalFromProps.bind(this)();
    }

    componentDidUpdate(props, state) {
      getDerivedGlobalFromProps.bind(this)();
      // super.componentDidUpdate(props, state);
    }

    componentWillUnmount() {
      componentWillUnmount.bind(this)();
      super.componentWillUnmount();
    }

    get global() {
      return globalStateManager.state(this);
    }

    setGlobal = setGlobal.bind(this);
  },

  PureComponent: class ReactNPureComponent extends React.PureComponent {

    constructor(props) {
      super(props);
      getDerivedGlobalFromProps.bind(this)(props);
    }

    componentDidUpdate(props, state) {
      getDerivedGlobalFromProps.bind(this)(props);
      // super.componentDidUpdate(props, state);
    }

    componentWillUnmount() {
      componentWillUnmount.bind(this)();
      // super.componentWillUnmount();
    }

    get global() {
      return globalStateManager.state(this);
    }

    setGlobal = setGlobal.bind(this);
  }
};

export default ReactN;
