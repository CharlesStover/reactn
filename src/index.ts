import React = require('react');
import { ReactNComponent, ReactNPureComponent } from './components';
import addCallback from './add-callback';
import addReducer from './add-reducer';
import addReducers from './add-reducers';
import createProvider from './create-provider';
import reactn from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import getGlobal from './get-global';
import removeCallback from './remove-callback';
import resetGlobal from './reset-global';
import setGlobal from './set-global';
import useGlobal from './use-global';
import useGlobalReducer from './use-global-reducer';
import withGlobal from './with-global';



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
  useGlobalReducer: useGlobalReducer.bind(null, null),
  withGlobal: withGlobal.bind(null, null),
});
