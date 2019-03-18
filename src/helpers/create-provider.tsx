<<<<<<< 08956a06597e1f2d22551e95a99379bfd1a3c669
import React, { Component } from 'react';
=======
import React from 'react';
>>>>>>> eslint
import Context from '../context';
import GlobalStateManager from '../global-state-manager';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal from './use-global';
import withGlobal from './with-global';

export default function createProvider(newGlobal = null) {
  const globalStateManager = new GlobalStateManager();
  const result = globalStateManager.set(newGlobal);

  class ReactNProvider extends React.Component {

    static addCallback(f) {
      return globalStateManager.addCallback(f);
    }

    static addReducer(name, reducer) {
      return addReducer(globalStateManager, name, reducer);
    }

    static getGlobal() {
      return globalStateManager.state;
    }

    static get global() {
      return globalStateManager.state;
    }

    static removeCallback(callback) {
      return globalStateManager.removeCallback(callback);
    }

    static resetGlobal() {
      return globalStateManager.reset();
    }

    static setGlobal(newGlobal, callback = null) {
      return setGlobal(globalStateManager, newGlobal, callback);
    }

    static useGlobal(property, setterOnly = false) {
<<<<<<< 08956a06597e1f2d22551e95a99379bfd1a3c669
<<<<<<< b16e52c8c0d92df1ff373ff870909a4034de9572:src/helpers/create-provider.js
      return useGlobal(globalState, property, setterOnly);
=======
      return useGlobal(property, setterOnly, globalStateManager);
>>>>>>> init:src/helpers/create-provider.tsx
=======
      return useGlobal(globalStateManager, property, setterOnly);
>>>>>>> eslint
    }

    static withGlobal(getter = global => global, setter = () => null) {
      return withGlobal(globalStateManager, getter, setter);
    }

    render() {
      return (
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }

  // If the state was set asynchronously, return the Provider asynchronously.
  if (result instanceof Promise) {
    return result.then(() => ReactNProvider);
  }

  // Return the Provider synchronously.
  return ReactNProvider;
}
