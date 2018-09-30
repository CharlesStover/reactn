import React from 'react';

ReactNGlobalState = {
  version: 1
};

const ReactN = {
  ...React,
  Component: class ReactNComponent extends React.Component {

    globalState = ReactNGlobalState;

    setGlobalState = globalState => {
      Object.assign(ReactNGlobalState, globalState);
      this.forceUpdate();
    }

  },
  PureComponent: class ReactNPureComponent extends React.PureComponent {

    globalState = ReactNGlobalState;

    setGlobalState = globalState => {
      Object.assign(ReactNGlobalState, globalState);
      this.forceUpdate();
    }

  }
};

export default ReactN;
