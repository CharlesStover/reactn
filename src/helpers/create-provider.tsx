<<<<<<< 08956a06597e1f2d22551e95a99379bfd1a3c669
import React, { Component } from 'react';
=======
import React from 'react';
>>>>>>> eslint
import Context from '../context';
import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import Callback from '../typings/callback';
import { LocalReducer } from '../typings/reducer';
import ReactNPromise from '../utils/reactn-promise';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal from './use-global';
import withGlobal from './with-global';

export interface ReactNProvider<GS> {
  addCallback(callback: Callback<GS>): RemoveAddedCallback;
  addReducer(name: string, reducer: LocalReducer<GS>): RemoveAddedReducer;
  getGlobal(): GS;
  global: GS;
  removeCallback(callback: Callback<GS>): boolean;
  resetGlobal(): void;
  new (props: {}, context?: any): React.Component<{}, {}>;
}

type RemoveAddedCallback = () => boolean;

type RemoveAddedReducer = () => boolean;

type StateTuple<T> = [ T, (newValue: T) => void ];

export default function createProvider<GS = {}>(
  initialState?: GS,
): ReactNProvider<GS> {

  const globalStateManager = new GlobalStateManager(
    initialState ||
    Object.create(null),
  );

  return class ReactNProvider extends React.Component<{}, {}> {

    public static addCallback(f: Callback<GS>): RemoveAddedCallback {
      return globalStateManager.addCallback(f);
    }

    public static addReducer(
      name: string,
      reducer: LocalReducer<GS>,
    ): RemoveAddedReducer {
      return addReducer(globalStateManager, name, reducer);
    }

    public static getGlobal(): GS {
      return globalStateManager.state;
    }

    public static get global(): GS {
      return globalStateManager.state;
    }

    public static removeCallback(callback: Callback<GS>): boolean {
      return globalStateManager.removeCallback(callback);
    }

    public static resetGlobal(): void {
      return globalStateManager.reset();
    }

    public static setGlobal(
      newGlobal: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): ReactNPromise<GS> {
      return setGlobal(globalStateManager, newGlobal, callback);
    }

<<<<<<< 1ee12ca565298091986330d22232bcbd07fa5248
    static useGlobal(property, setterOnly = false) {
<<<<<<< 08956a06597e1f2d22551e95a99379bfd1a3c669
<<<<<<< b16e52c8c0d92df1ff373ff870909a4034de9572:src/helpers/create-provider.js
      return useGlobal(globalState, property, setterOnly);
=======
      return useGlobal(property, setterOnly, globalStateManager);
>>>>>>> init:src/helpers/create-provider.tsx
=======
=======
    public static useGlobal<Property extends keyof GS>(
      property: Property,
      setterOnly: boolean = false,
    ): StateTuple<GS[Property]> {
>>>>>>> create-provider
      return useGlobal(globalStateManager, property, setterOnly);
>>>>>>> eslint
    }

    public static withGlobal(
      getter = global => global,
      setter = () => null,
    ) {
      return withGlobal(globalStateManager, getter, setter);
    }

    public render(): JSX.Element {
      return (
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
}
