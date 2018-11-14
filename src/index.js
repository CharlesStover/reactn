const React = require('react');
const { ReactNComponent, ReactNPureComponent } = require('./components');
const { Provider } = require('./context');
const ReactN = require('./decorator');
const GlobalState = require('./global-state');
const {
  addReducer, resetGlobal, setGlobal, useGlobal, withGlobal
} = require('./helpers/index');

Object.assign(ReactN, React, {
  addReducer,
  Component: ReactNComponent,
  default: ReactN,
  GlobalState,
  Provider,
  PureComponent: ReactNPureComponent,
  resetGlobal,
  setGlobal,
  useGlobal,
  withGlobal
});

module.exports = ReactN;
