import { Component } from 'react';
import Context from '../context';
import GlobalState from '../global-state';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal from './use-global';
import withGlobal from './with-global';

export default function createProvider(newGlobal = null) {
  const globalState = new GlobalState();
  const result = globalState.setAny(newGlobal);

  class ReactNProvider extends Component {

    static addCallback(f) {
      return globalState.addCallback(f);
    }

    static addReducer(name, reducer) {
      return addReducer(globalState, name, reducer);
    }

    static getGlobal() {
      return globalState.stateWithReducers;
    }

    static get global() {
      return globalState.stateWithReducers;
    }

    static removeCallback(callback) {
      return globalState.removeCallback(callback);
    }

    static resetGlobal() {
      return globalState.reset();
    }

    static setGlobal(newGlobal, callback = null) {
      return setGlobal(globalState, newGlobal, callback);
    }

    static useGlobal(property, setterOnly = false) {
      return useGlobal(globalState, property, setterOnly);
    }

    static withGlobal(getter = global => global, setter = () => null) {
      return withGlobal(globalState, getter, setter);
    }

    render() {
      return (
        <Context.Provider value={globalState}>
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
