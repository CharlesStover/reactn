const {
  createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
} = require('./methods');

// @reactn
const ReactN = function ReactN(Component) {
  class ReactNComponent extends Component {

    static displayName = (Component.displayName || Component.name) + '-ReactN';

    constructor(...args) {
      super(...args);
    }

    componentWillUnmount(...args) {
      ReactNComponentWillUnmount(this);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount(...args);
      }
    }

    _globalCallback = () => {
      ReactNGlobalCallback(this);
    };

    get global() {
      return ReactNGlobal(this);
    }

    setGlobal(global, callback = null) {
      ReactNSetGlobal(this, global, callback);
    }
  }

  // getDerivedGlobalFromProps
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = createReactNGetDerivedStateFromProps(Component);
  }

  return ReactNComponent;
};

module.exports = ReactN;
