import { Reducers, State } from '../default';
import { ComponentClass } from 'react';
import { ReactNComponentClass } from './components';
import {
  // createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
  ReactNDispatch,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';
import { AdditionalDispatchers, DispatcherMap } from './typings/reducer';



// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// Get the name of a Component.
const componentName = (DecoratedComponent: ComponentClass): string =>
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

    public componentWillUpdate(...args: [ P, S, any ]): void {
      ReactNComponentWillUpdate(this);
      if (super.componentWillUpdate) {
        super.componentWillUpdate(...args);
      }
    }

    public get dispatch(): DispatcherMap<G, R> & AdditionalDispatchers<G> {
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
