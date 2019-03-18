import React from 'react';
import { ReactNComponent, ReactNPureComponent } from './components';
import ReactN from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';
import addReducer from './helpers/add-reducer';
import createProvider from './helpers/create-provider';
import setGlobal from './helpers/set-global';
import useGlobal from './helpers/use-global';
import withGlobal from './helpers/with-global';

type RemoveAddedCallback = () => boolean;

const helperFunctions = {

  addCallback: (callback: Callback<Object>): RemoveAddedCallback =>
    defaultGlobalStateManager.addCallback(callback),

  addReducer: (name: string, reducer: LocalReducer<Object>): void =>
    addReducer(defaultGlobalStateManager, name, reducer),

  Component: ReactNComponent,

  createProvider,

  default: ReactN,

  getGlobal: (): Object =>
    defaultGlobalStateManager.state,

  PureComponent: ReactNPureComponent,

  removeCallback: (callback: Callback<Object>): boolean =>
    defaultGlobalStateManager.removeCallback(callback),

  resetGlobal: (): void =>
    defaultGlobalStateManager.reset(),

  setGlobal: (
    newGlobal: NewGlobalState<Object>,
    callback: Callback<Object> | null = null,
  ): ReactNPromise<Object> =>
    setGlobal(defaultGlobalStateManager, newGlobal, callback),

  useGlobal: <GS = Object>(
    property: keyof GS,
    setterOnly: boolean = false
  ): ReactNHook<GS[property]> =>
    useGlobal(null, property, setterOnly),

  withGlobal: (getter = global => global, setter = () => null) =>
    withGlobal(null, getter, setter)

};

Object.assign(ReactN, React, helperFunctions);

module.exports = ReactN;
