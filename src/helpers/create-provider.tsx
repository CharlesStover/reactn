import React from 'react';
import Context from '../context';
import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal from './use-global';
import withGlobal from './with-global';

export default function createProvider<GS>(
  initialState: NewGlobalState<GS> = null,
): typeof React.Component {
  const globalStateManager = new GlobalStateManager(initialState);

  return class ReactNProvider extends React.Component<{}, {}> {

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
      return useGlobal(globalStateManager, property, setterOnly);
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
}