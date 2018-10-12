import globalStateManager, { removeListeners } from './global-state-manager';
export { default as reducers } from './reducers';

const setGlobal = g => {
  globalStateManager.set(
    typeof g === 'function' ?
      g(globalStateManager._state) :
      g
  );
};

const ReactN = function(Component) {
  class ReactNComponent extends Component {

    constructor(...args) {
      super(...args);
      if (!Object.prototype.hasOwnProperty.call(this, 'state')) {
        this.state = Object.create(null);
      }
    }

    static getDerivedStateFromProps = function(props, ...args) {

      // getDerivedGlobalFromProps
      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
        const newState = Component.getDerivedGlobalFromProps(props, globalStateManager._state, ...args);
        globalStateManager.set(newState);
      }

      // getDerivedStateFromProps
      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
        return Component.getDerivedStateFromProps(props, ...args);
      }
      return null;
    };

    componentWillUnmount() {

      // Do not re-render this component on state change.
      removeListeners(this);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    get global() {
      return globalStateManager.state(this);
    }

    setGlobal(global, callback = null) {
      setTimeout(
        () => {
          setGlobal(global);
          if (callback) {
            callback();
          }
        },
        0
      );
    }

  }

  ReactNComponent.displayName = (Component.displayName || Component.name) + '-ReactN';

  return ReactNComponent;
};

Object.defineProperty(ReactN, 'init', {
  configurable: true,
  enumerable: false,
  value: g => {
    delete ReactN.init;
    setGlobal(g);
  },
  writable: false
});

export default ReactN;

export const init = ReactN.init;
