const React = require('react');
const { ReactNComponent, ReactNPureComponent } = require('./components');
const { default: ReactN } = require('./decorator');
const defaultGlobalState = require('./default-global-state').default;
const addReducer = require('./helpers/add-reducer').default;
const createProvider = require('./helpers/create-provider').default;
const setGlobal = require('./helpers/set-global').default;
const useGlobal = require('./helpers/use-global').default;
const withGlobal = require('./helpers/with-global').default;

Object.assign(ReactN, React, {
  addCallback: callback =>
    defaultGlobalState.addCallback(callback),
  addReducer: (name, reducer) =>
    addReducer(defaultGlobalState, name, reducer),
  Component: ReactNComponent,
  createProvider,
  default: ReactN,
  getGlobal: () =>
    defaultGlobalState.stateWithReducers,
  PureComponent: ReactNPureComponent,
  removeCallback: callback =>
    defaultGlobalState.removeCallback(callback),
  resetGlobal: () =>
    defaultGlobalState.reset(),
  setGlobal: (newGlobal, callback = null) =>
    setGlobal(defaultGlobalState, newGlobal, callback),
  useGlobal: (property, setterOnly = false) =>
    useGlobal(null, property, setterOnly),
  withGlobal: (getter = global => global, setter = () => null) =>
    withGlobal(null, getter, setter)
});

module.exports = ReactN;
