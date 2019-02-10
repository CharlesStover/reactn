const React = require('react');
const { ReactNComponent, ReactNPureComponent } = require('./components');
const { default: ReactN } = require('./decorator');
const {
  addCallback, addReducer, getGlobal, removeCallback, resetGlobal, setGlobal,
  useGlobal, withGlobal
} = require('./helpers/index');

Object.assign(ReactN, React, {
  addCallback,
  addReducer,
  Component: ReactNComponent,
  default: ReactN,
  getGlobal,
  PureComponent: ReactNPureComponent,
  removeCallback,
  resetGlobal,
  setGlobal,
  useGlobal,
  withGlobal
});

module.exports = ReactN;
