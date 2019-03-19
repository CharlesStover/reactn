import * as React from 'react';
import { ReactNComponent, ReactNPureComponent } from './components';
import ReactN from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import { NewGlobalState } from './global-state-manager';
import addReducer from './helpers/add-reducer';
import createProvider from './helpers/create-provider';
import setGlobal from './helpers/set-global';
import useGlobal from './helpers/use-global';
import withGlobal from './helpers/with-global';
import Callback from './typings/callback';
import { LocalReducer } from './typings/reducer';

type RemoveAddedCallback = () => boolean;
type RemoveAddedReducer = () => boolean;

const helperFunctions = {

  addCallback: (callback: Callback<Object>): RemoveAddedCallback =>
    defaultGlobalStateManager.addCallback(callback),

  addReducer: <GS>(
    name: string,
    reducer: LocalReducer<GS>,
  ): RemoveAddedReducer =>
    addReducer(defaultGlobalStateManager, name, reducer),

  Component: ReactNComponent,

  createProvider,

  default: ReactN,

  getGlobal: <GS = Record<string, any>>(): GS =>
    defaultGlobalStateManager.state,

  PureComponent: ReactNPureComponent,

  removeCallback: <GS = Record<string, any>>(callback: Callback<GS>): boolean =>
    defaultGlobalStateManager.removeCallback(callback),

  resetGlobal: (): void =>
    defaultGlobalStateManager.reset(),

  setGlobal: <GS = Record<string, any>>(
    newGlobal: NewGlobalState<GS>,
    callback: Callback<GS> | null = null,
  ): Promise<GS> =>
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
