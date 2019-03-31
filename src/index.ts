import React = require('react');
import { ReactNComponent, ReactNPureComponent } from './components';
import reactn from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import addCallback from './helpers/add-callback';
import addReducer from './helpers/add-reducer';
import addReducers from './helpers/add-reducers';
import createProvider from './helpers/create-provider';
import getGlobal from './helpers/get-global';
import removeCallback from './helpers/remove-callback';
import resetGlobal from './helpers/reset-global';
import setGlobal from './helpers/set-global';
import useGlobal from './helpers/use-global';
import withGlobal from './helpers/with-global';



// TODO: Fix "as any as ReactN"
//   It should just work without "as" anything.
export = Object.assign(reactn, React, {
  addCallback: addCallback.bind(null, defaultGlobalStateManager),
  addReducer: addReducer.bind(null, defaultGlobalStateManager),
  addReducers: addReducers.bind(null, defaultGlobalStateManager),
  Component: ReactNComponent,
  createProvider,
  default: reactn,
  getGlobal: getGlobal.bind(null, defaultGlobalStateManager),
  PureComponent: ReactNPureComponent,
  removeCallback: removeCallback.bind(null, defaultGlobalStateManager),
  resetGlobal: resetGlobal.bind(null, defaultGlobalStateManager),
  setGlobal: setGlobal.bind(null, defaultGlobalStateManager),
  useGlobal: useGlobal.bind(null, null),
  withGlobal: withGlobal.bind(null, null),
});
