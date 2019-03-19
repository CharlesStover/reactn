import { Component } from 'react';
import { ReactNComponent } from './components';
import {
  // createReactNGetDerivedStateFromProps,
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';
import { NewGlobalState } from './global-state-manager';
import Callback from './typings/callback';

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// Get the name of a Component.
const componentName = (DecoratedComponent: typeof Component): string =>
  typeof DecoratedComponent === 'string' ?
    DecoratedComponent :
    // DecoratedComponent.displayName || // displayName is not static?
    DecoratedComponent.name;

// @reactn
export default function ReactN<
  GS extends {} = Record<string, any>,
  P extends {} = {},
  S extends {} = {},
  SS extends {} = {},
>(DecoratedComponent: Component<P, S, SS>): ReactNComponent<P, S, GS, SS> {
  class ReactNComponent extends DecoratedComponent<P, S, SS> {

    public static displayName: string = `${componentName(DecoratedComponent)}-ReactN`;

    public componentWillUnmount(): void {
      ReactNComponentWillUnmount(this._globalCallback);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    private _globalCallback = (): void =>
      ReactNGlobalCallback(this);

    public get global(): GS {
      return ReactNGlobal(this._globalCallback);
    }

    public setGlobal(
      newGlobal: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> {
      return ReactNSetGlobal(
        this, newGlobal, callback,
        !isComponentDidMount &&
        !isComponentDidUpdate &&
        !isSetGlobalCallback
      );
    }
  }

  // getDerivedGlobalFromProps
  /*
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = createReactNGetDerivedStateFromProps(Component);
  }
  */

  return ReactNComponent;
};
