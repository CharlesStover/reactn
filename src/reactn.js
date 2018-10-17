import globalStateManager from './global-state-manager';

const reducers = Object.create(null);

const ReactN = function(Component) {
  class ReactNComponent extends Component {

    constructor(...args) {
      super(...args);
    }

    componentWillUnmount() {

      // Do not re-render this component on state change.
      globalStateManager.removeListeners(this);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    get global() {
      return Object.assign(
        globalStateManager.state(this),
        reducers
      );
    }

    setGlobal(global, callback = null) {
      const setGlobal = globalStateManager.setAny(global);
      if (typeof callback === 'function') {
        if (setGlobal instanceof Promise) {
          setGlobal.then(() => {
            callback(this.global);
          });
        }
        else {
          callback(this.global);
        }
      }
    }

  }

  // getDerivedGlobalFromProps
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactN.getDerivedStateFromProps = (props, ...args) => {
      const newState = Component.getDerivedGlobalFromProps(props, globalStateManager._state, ...args);
      globalStateManager.setAny(newState);

      // getDerivedStateFromProps
      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
        return Component.getDerivedStateFromProps(props, ...args);
      }
      return null;
    };
  }

  ReactNComponent.displayName = (Component.displayName || Component.name) + '-ReactN';

  return ReactNComponent;
};

export default ReactN;

export const addReducer = (name, reducer) => {
  reducers[name] = (...args) => {
    globalStateManager.setAny(
      reducer(globalStateManager._state, ...args)
    );
  };
};

export const setGlobal = g =>
  globalStateManager.setAny(g);
