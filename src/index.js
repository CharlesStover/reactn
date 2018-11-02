const React = require('react');
const { ReactNComponent, ReactNPureComponent } = require('./components');
const ReactN = require('./decorator');
const { addReducer, setGlobal, useGlobal, withGlobal } = require('./helpers/index');

Object.assign(ReactN, React, {
  addReducer,
  Component: ReactNComponent,
  default: ReactN,
  PureComponent: ReactNPureComponent,
  setGlobal,
  useGlobal,
  withGlobal
});

module.exports = ReactN;
