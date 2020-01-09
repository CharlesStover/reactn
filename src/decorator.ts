import { ComponentClass, version } from 'react';
import { Reducers, State } from '../default';
import Callback from '../types/callback';
import { ReactNComponentClass } from '../types/component-class';
import Dispatchers from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import {
  // createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
  ReactNDispatch,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';



// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// Get the name of a Component.
const componentName = <
  P extends {} = {},
  S extends {} = {},
>(DecoratedComponent: ComponentClass<P, S>): string =>
  typeof DecoratedComponent === 'string' ?
    DecoratedComponent :
    DecoratedComponent.displayName ||
    DecoratedComponent.name;

// @reactn
export default function ReactN<
  G extends {} = State,
  R extends {} = Reducers,
  P extends {} = {},
  S extends {} = {},
  SS = any,
>(
  DecoratedComponent: ComponentClass<P, S>,
): ReactNComponentClass<P, S, G, R, SS> {
  class DecoratedReactNComponent extends DecoratedComponent {

    public static displayName: string =
      `${componentName(DecoratedComponent)}-ReactN`;

    public constructor(props: Readonly<P>, context?: any) {
      super(props, context);
      this._globalCallback = this._globalCallback.bind(this);
    }

    public componentWillUnmount(): void {
      ReactNComponentWillUnmount(this);
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    public UNSAFE_componentWillUpdate(...args: [ P, S, any ]): void {
      const [ rVerMaj, rVerMin ] = version.split('.').map(parseInt)
      if (rVerMaj > 16 || (rVerMaj === 16 && rVerMin >= 3)) {
        ReactNComponentWillUpdate(this);
      }
      if (super.UNSAFE_componentWillUpdate) {
        super.UNSAFE_componentWillUpdate(...args);
      }
    }

    public componentWillUpdate(...args: [ P, S, any ]): void {
      const [ rVerMaj, rVerMin ] = version.split('.').map(parseInt)
      if (rVerMaj < 16 || (rVerMaj === 16 && rVerMin < 3)) {
        ReactNComponentWillUpdate(this);
      }
      if (super.componentWillUpdate) {
        super.componentWillUpdate(...args);
      }
    }

    public get dispatch(): Dispatchers<G, R> {
      return ReactNDispatch<G, R>();
    }

    public get global(): Readonly<G> {
      return ReactNGlobal<G>(this);
    }

    public setGlobal(
      newGlobalState: NewGlobalState<G>,
      callback: Callback<G> | null = null,
    ): Promise<G> {
      return ReactNSetGlobal<G>(
        newGlobalState, callback,
        !isComponentDidMount &&
        !isComponentDidUpdate &&
        !isSetGlobalCallback,
      );
    }

    public _globalCallback(): void {
      return ReactNGlobalCallback(this);
    }
  }

  // getDerivedGlobalFromProps
  /*
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = createReactNGetDerivedStateFromProps(Component);
  }
  */

  return DecoratedReactNComponent;
};
