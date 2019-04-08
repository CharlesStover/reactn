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
import { AdditionalDispatchers, Dispatchers } from './typings/reducer';



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
  GS extends {} = {},
  R extends {} = {},
  P extends {} = {},
  S extends {} = {},
  SS = any,
>(
  DecoratedComponent: ComponentClass<P, S>,
): ReactNComponentClass<P, S, GS, R, SS> {
  class DecoratedReactNComponent extends DecoratedComponent {

    public static displayName: string =
      `${componentName(DecoratedComponent)}-ReactN`;

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

    public get dispatch(): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
      return ReactNDispatch<GS, R>();
    }

    public get global(): Readonly<GS> {
      return ReactNGlobal<GS>(this);
    }

    public setGlobal(
      newGlobalState: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> {
      return ReactNSetGlobal<GS>(
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
