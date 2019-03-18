import { Component, PureComponent } from 'react';
import {
  ReactNComponentWillUnmount,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal
} from './methods';
import ReactNPromise from './utils/reactn-promise';

type ComponentWillUnmount = (..._: any[]) => void;

// Accurately define React components as having an updater member variable.
declare class TrueComponent<P, S, SS> extends Component<P, S, SS> {
  updater: {
    enqueueForceUpdate:
      (component: Component, _: null, action: 'forceUpdate') => void;
  }
}
declare class TruePureComponent<P, S, SS> extends PureComponent<P, S, SS> {
  updater: {
    enqueueForceUpdate:
      (component: Component, _: null, action: 'forceUpdate') => void;
  }
}

// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// this.componentWillUnmount on instance
const componentWillMountInstance = (
  _this: ReactNComponent | ReactNPureComponent
): boolean => {
  if (Object.prototype.hasOwnProperty.call(_this, 'componentWillUnmount')) {
    const instanceCwu: ComponentWillUnmount = _this.componentWillUnmount;
    _this.componentWillUnmount = (...a: any[]): void => {
      ReactNComponentWillUnmount(_this);
      instanceCwu(...a);
    };
    return true;
  }
  return false;
};

// this.componentWillUnmount on prototype
const componentWillMountPrototype = (
  _this: ReactNComponent | ReactNPureComponent
): boolean => {
  const proto: ReactNComponent | ReactNPureComponent =
    Object.getPrototypeOf(_this);
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount')) {
    _this.componentWillUnmount = (...a: any[]): void => {
      ReactNComponentWillUnmount(_this);
      proto.componentWillUnmount.bind(_this)(...a);
    };
    return true;
  }
  return false;
};

export class ReactNComponent<P = {}, S = {}, GS = Object, SS = any>
       extends TrueComponent<P, S, SS> {

  constructor(props: Readonly<P>, context?: any) {
    super(props, context);

    // this.componentWillUnmount on instance
    if (
      !componentWillMountInstance(this) &&
      !componentWillMountPrototype(this)
    ) {

      /**
       * Hack:
       * If we didn't find componentWillMount on the instance, attempt to
       *   find it again after the sub class finishes its constructor.
       * Disabled because it makes me uncomfortable and doesn't pass
       *   synchronous unit tests anyway.
      setTimeout(() => {
        componentWillMountInstance(this);
      }, 0);
       */
    }
  }

  componentWillUnmount(): void {
    return ReactNComponentWillUnmount(this);
  }

  _globalCallback: PropertyListener = (): void =>
    ReactNGlobalCallback(this);

  get global(): Readonly<GS> {
    return ReactNGlobal<GS>(this);
  }

  setGlobal(newGlobal, callback = null) {
    return ReactNSetGlobal(
      this, newGlobal, callback,
      !isComponentDidMount &&
      !isComponentDidUpdate &&
      !isSetGlobalCallback
    );
  }
}

export class ReactNPureComponent<P = {}, S = {}, GS = Object, SS = any>
       extends TruePureComponent<P, S, SS> {

  constructor(props: Readonly<P>, context?: any) {
    super(props, context);

    // this.componentWillUnmount on instance
    if (
      !componentWillMountInstance(this) &&
      !componentWillMountPrototype(this)
    ) {

      /**
       * Hack:
       * If we didn't find componentWillMount on the instance, attempt to
       *   find it again after the sub class finishes its constructor.
       * Disabled because it makes me uncomfortable and doesn't pass
       *   synchronous unit tests anyway.
      setTimeout(() => {
        componentWillMountInstance(this);
      }, 0);
       */
    }
  }

  componentWillUnmount(): void {
    return ReactNComponentWillUnmount(this);
  }

  _globalCallback: PropertyListener = (): void =>
    ReactNGlobalCallback(this);

  get global(): Readonly<GS> {
    return ReactNGlobal<GS>(this);
  }

  setGlobal(
    newGlobal: NewGlobalState<GS>,
    callback: Callback<GS> | null = null
  ): ReactNPromise<GS> {
    return ReactNSetGlobal<GS>(
      this, newGlobal, callback,
      !isComponentDidMount &&
      !isComponentDidUpdate &&
      !isSetGlobalCallback
    );
  }
}
