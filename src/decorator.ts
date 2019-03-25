import { ComponentClass } from 'react';
import { ReactNComponentClass } from './components';
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
const componentName = (DecoratedComponent: ComponentClass): string =>
  typeof DecoratedComponent === 'string' ?
    DecoratedComponent :
    DecoratedComponent.displayName ||
    DecoratedComponent.name;

// @reactn
export default function ReactN<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
>(DecoratedComponent: ComponentClass<P, S>): ReactNComponentClass<P, S, GS> {
  class ReactNComponent extends DecoratedComponent {

    public static displayName: string = `${componentName(DecoratedComponent)}-ReactN`;

    public componentWillUnmount(): void {
      ReactNComponentWillUnmount(this._globalCallback);

      // componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    private _globalCallback = (): void =>
      // @ts-ignore: Types have separate declarations of a private property '_globalCallback'.
      ReactNGlobalCallback(this);

    public get global(): Readonly<GS> {
      return ReactNGlobal<GS>(this._globalCallback);
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
  }

  // getDerivedGlobalFromProps
  /*
  if (Object.prototype.hasOwnProperty.call(Component, 'getDerivedGlobalFromProps')) {
    ReactNComponent.getDerivedStateFromProps = createReactNGetDerivedStateFromProps(Component);
  }
  */

  return ReactNComponent;
};
