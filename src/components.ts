import { Component, ComponentClass, PureComponent } from 'react';
import { NewGlobalState, PropertyListener } from './global-state-manager';
import {
  ReactNComponentWillUnmount,
  ReactNDispatch,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';
import Callback from './typings/callback';
import { Dispatchers } from './typings/reducer';



/*
interface ReactNComponent<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  SS = any,
> extends Component<P, S, SS> {
  readonly global: Readonly<GS>;
  setGlobal(newGlobalState: NewGlobalState<GS>, callback?: Callback<GS>):
    Promise<Readonly<GS>>;
}
*/

export interface ReactNComponentClass<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  SS = any,
> extends ComponentClass<P, S> {
  new (props: P, context?: any): ReactNComponent<P, S, GS, SS>;
}

export interface ReactNPureComponentClass<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  SS = any,
> extends ComponentClass<P, S> {
  new (props: P, context?: any): ReactNPureComponent<P, S, GS, SS>;
}

type VoidFunction = () => void;



// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// this.componentWillUnmount on instance
const componentWillMountInstance = (
  that: ReactNComponent | ReactNPureComponent,
  propertyListener: PropertyListener,
): boolean => {
  if (Object.prototype.hasOwnProperty.call(that, 'componentWillUnmount')) {
    const instanceCwu: VoidFunction = that.componentWillUnmount;
    that.componentWillUnmount = (): void => {
      ReactNComponentWillUnmount(propertyListener);
      instanceCwu();
    };
    return true;
  }
  return false;
};

// this.componentWillUnmount on prototype
const componentWillMountPrototype = (
  that: ReactNComponent | ReactNPureComponent,
  propertyListener: PropertyListener,
): boolean => {
  const proto: ReactNComponent | ReactNPureComponent =
    Object.getPrototypeOf(that);
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount')) {
    that.componentWillUnmount = (): void => {
      ReactNComponentWillUnmount(propertyListener);
      proto.componentWillUnmount.bind(that)();
    };
    return true;
  }
  return false;
};



export class ReactNComponent<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  R extends {} = {},
  SS = any,
> extends Component<P, S, SS> {
  public constructor(props: Readonly<P>, context?: any) {
    super(props, context);

    // this.componentWillUnmount on instance
    if (
      !componentWillMountInstance(this, this._globalCallback) &&
      !componentWillMountPrototype(this, this._globalCallback)
    ) {

      /**
       * Hack:
       * If we didn't find componentWillMount on the instance, attempt to
       *   find it again after the sub class finishes its constructor.
       * Disabled because it makes me uncomfortable and doesn't pass
       *   synchronous unit tests anyway.
      setTimeout((): void => {
        componentWillMountInstance(this);
      }, 0);
      */
    }
  }

  public componentWillUnmount(): void {
    return ReactNComponentWillUnmount(this._globalCallback);
  }

  private _globalCallback: PropertyListener = (): void =>
    ReactNGlobalCallback(this);

  public get dispatch(): Readonly<Dispatchers<GS, R>> {
    return ReactNDispatch<GS, R>();
  }

  public get global(): Readonly<GS> {
    return ReactNGlobal<GS>(this._globalCallback);
  }

  public setGlobal(
    newGlobalState: NewGlobalState<GS>,
    callback: Callback<GS> | null = null
  ): Promise<Readonly<GS>> {
    return ReactNSetGlobal<GS>(
      newGlobalState, callback,
      !isComponentDidMount &&
      !isComponentDidUpdate &&
      !isSetGlobalCallback,
    );
  }
};

export class ReactNPureComponent<
  P extends {} = {},
  S extends {} = {},
  GS extends {} = {},
  SS = any,
> extends PureComponent<P, S, SS> {
  public constructor(props: Readonly<P>, context?: any) {
    super(props, context);

    // this.componentWillUnmount on instance
    if (
      !componentWillMountInstance(this, this._globalCallback) &&
      !componentWillMountPrototype(this, this._globalCallback)
    ) {

      /**
       * Hack:
       * If we didn't find componentWillMount on the instance, attempt to
       *   find it again after the sub class finishes its constructor.
       * Disabled because it makes me uncomfortable and doesn't pass
       *   synchronous unit tests anyway.
      setTimeout((): void => {
        componentWillMountInstance(this);
      }, 0);
      */
    }
  }

  public componentWillUnmount(): void {
    return ReactNComponentWillUnmount(this._globalCallback);
  }

  private _globalCallback: PropertyListener = (): void =>
    ReactNGlobalCallback(this);

  public get global(): Readonly<GS> {
    return ReactNGlobal<GS>(this._globalCallback);
  }

  public setGlobal(
    newGlobalState: NewGlobalState<GS>,
    callback: Callback<GS> | null = null
  ): Promise<Readonly<GS>> {
    return ReactNSetGlobal<GS>(
      newGlobalState, callback,
      !isComponentDidMount &&
      !isComponentDidUpdate &&
      !isSetGlobalCallback,
    );
  }
};
