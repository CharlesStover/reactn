import globalStateManager, { removeListeners } from './global-state-manager';
export { default as reducers } from './reducers';

const ReactN = function(Component) {
  class ReactNComponent extends Component {

    constructor(...args) {
      super(...args);
    }

    static getDerivedStateFromProps = function(props, ...args) {

      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
        const newState = Component.getDerivedGlobalFromProps(props, globalStateManager._state, ...args);
        globalStateManager.set(newState);
      }

      if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedStateFromProps')) {
        return Component.getDerivedStateFromProps(props, ...args);
      }
      return null;
    };

    componentWillUnmount() {
      removeListeners(this);
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    get global() {
      return globalStateManager.state(this);
    }

    setGlobal = g => {
      globalStateManager.set(
        typeof g === 'function' ?
          g(globalStateManager._state) :
          g
      );
    };

  }

  ReactNComponent.displayName = Component.displayName + '-ReactN';

  return ReactNComponent;
};

export default ReactN;
