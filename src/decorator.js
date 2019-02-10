import {
  createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
} from './methods';

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// @reactn
export default function ReactN(Component) {
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
      ReactNSetGlobal(
        this, global, callback,
        !isComponentDidMount &&
        !isComponentDidUpdate &&
        !isSetGlobalCallback
      );
    }
  }

  // getDerivedGlobalFromProps
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = createReactNGetDerivedStateFromProps(Component);
  }

  return ReactNComponent;
};
