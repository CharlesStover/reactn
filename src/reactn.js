import React from 'react';

const GlobalStateManager = {
  globalState: Object.create(null),
  set: (key, value) => {
    Object.defineProperty(GlobalStateManager.globalState)
  }
};

const setGlobalState = function(globalState) {
  const modification =
    typeof globalState === 'function' ?
      globalState(GlobalStateManager.globalState) :
      globalState;
  Object.assign(ReactNGlobalState, modification);
};

const ReactN = {
  ...React,
  Component: class ReactNComponent extends React.Component {
    globalState = GlobalStateManager.globalState;
    setGlobalState = setGlobalState.bind(this);
  },
  PureComponent: class ReactNPureComponent extends React.PureComponent {
    globalState = GlobalStateManager.globalState;
    setGlobalState = setGlobalState.bind(this);
  }
};

export default ReactN;
