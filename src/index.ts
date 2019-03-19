import * as React from 'react';
import { ReactNComponent, ReactNPureComponent } from './components';
import ReactN from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import addReducer from './helpers/add-reducer';
import createProvider from './helpers/create-provider';
import setGlobal from './helpers/set-global';
import useGlobal, { StateTuple } from './helpers/use-global';
import withGlobal, { Getter, Setter, WithGlobal } from './helpers/with-global';
import Callback from './typings/callback';
import { LocalReducer } from './typings/reducer';

type RemoveAddedCallback = () => boolean;
type RemoveAddedReducer = () => boolean;
type RSA = Record<string, any>;

const helperFunctions = {

  addCallback: <GS extends RSA = RSA>(
    callback: Callback<GS>
  ): RemoveAddedCallback =>
    defaultGlobalStateManager.addCallback(callback),

  addReducer: <GS extends RSA = RSA>(
    name: string,
    reducer: LocalReducer<GS>,
  ): RemoveAddedReducer =>
    addReducer(defaultGlobalStateManager, name, reducer),

  Component: ReactNComponent,

  createProvider,

  default: ReactN,

  getGlobal: <GS extends RSA = RSA>(): GS =>
    defaultGlobalStateManager.state,

  PureComponent: ReactNPureComponent,

  removeCallback: <GS extends RSA = RSA>(callback: Callback<GS>): boolean =>
    defaultGlobalStateManager.removeCallback(callback),

  resetGlobal: (): void =>
    defaultGlobalStateManager.reset(),

  setGlobal: <GS extends RSA = RSA>(
    newGlobal: NewGlobalState<GS>,
    callback: Callback<GS> | null = null,
  ): Promise<GS> =>
    setGlobal<GS>(
      defaultGlobalStateManager as GlobalStateManager<GS>,
      newGlobal,
      callback
    ),

  useGlobal: <GS extends RSA, Property extends keyof GS>(
    property: Property,
    setterOnly: boolean = false,
  ): StateTuple<GS, Property> =>
    useGlobal(null, property, setterOnly),

  withGlobal: <GS extends {} = {}, HP extends {} = {}, LP extends {} = {}>(
    getter: Getter<GS, HP, LP> = (globalState: GS): GS => globalState,
    setter: Setter<GS, HP, LP> = () => null,
  ): WithGlobal<HP, LP> =>
    withGlobal<GS, HP, LP>(null, getter, setter)

};

Object.assign(ReactN, React, helperFunctions);

module.exports = ReactN;
