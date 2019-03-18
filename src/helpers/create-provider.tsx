import { Component } from 'react';
import Context from '../context';
import GlobalStateManager from '../global-state-manager';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal from './use-global';
import withGlobal from './with-global';

export default function createProvider(newGlobal = null) {
  const globalStateManager = new GlobalStateManager();
  const result = globalStateManager.set(newGlobal);

  class ReactNProvider extends Component {

    static addCallback(f) {
      return globalStateManager.addCallback(f);
    }

    static addReducer(name, reducer) {
      return addReducer(globalStateManager, name, reducer);
    }

    static getGlobal() {
      return globalStateManager.stateWithReducers;
    }

    static get global() {
      return globalStateManager.stateWithReducers;
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
      return useGlobal(property, setterOnly, globalStateManager);
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
