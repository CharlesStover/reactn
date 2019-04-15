import { Reducers, State } from '../default';
import { Component, ComponentClass, PureComponent } from 'react';
import { NewGlobalState } from './global-state-manager';
import {
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
  ReactNDispatch,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';
import Callback from './typings/callback';
import { DispatcherMap } from './typings/reducer';



type ComponentWillUpdate<P extends {} = {}, S extends {} = {}> =
  (nextProps: P, nextState: S, context: any) => void;

export interface ReactNComponentClass<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends ComponentClass<P, S> {
  new (props: P, context?: any): ReactNComponent<P, S, G, R, SS>;
}

export interface ReactNPureComponentClass<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends ComponentClass<P, S> {
  new (props: P, context?: any): ReactNPureComponent<P, S, G, R, SS>;
}

type VoidFunction = () => void;



// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;

// this.componentWillUnmount on instance
const componentWillUnmountInstance = (
  that: ReactNComponent | ReactNPureComponent,
): boolean => {
  if (Object.prototype.hasOwnProperty.call(that, 'componentWillUnmount')) {
    const instanceCwu: VoidFunction = that.componentWillUnmount;
    that.componentWillUnmount = (): void => {
      ReactNComponentWillUnmount(that);
      instanceCwu();
    };
    return true;
  }
  return false;
};

// this.componentWillUnmount on prototype
const componentWillUnmountPrototype = (
  that: ReactNComponent | ReactNPureComponent,
): boolean => {
  const proto: ReactNComponent | ReactNPureComponent =
    Object.getPrototypeOf(that);
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUnmount')) {
    that.componentWillUnmount = (): void => {
      ReactNComponentWillUnmount(that);
      proto.componentWillUnmount.bind(that)();
    };
    return true;
  }
  return false;
};

// this.componentWillUpdate on instance
const componentWillUpdateInstance = <P extends {} = {}, S extends {} = {}>(
  that: ReactNComponent<P, S> | ReactNPureComponent<P, S>,
): boolean => {
  if (Object.prototype.hasOwnProperty.call(that, 'componentWillUpdate')) {
    const instanceCwu: ComponentWillUpdate<P, S> = that.componentWillUpdate;
    that.componentWillUpdate = (...args: [ P, S, any ]): void => {
      ReactNComponentWillUpdate(that);
      instanceCwu(...args);
    };
    return true;
  }
  return false;
};

// this.componentWillUpdate on prototype
const componentWillUpdatePrototype = <P extends {} = {}, S extends {} = {}>(
  that: ReactNComponent<P, S> | ReactNPureComponent<P, S>,
): boolean => {
  const proto: ReactNComponent | ReactNPureComponent =
    Object.getPrototypeOf(that);
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUpdate')) {
    that.componentWillUpdate = (...args: [ P, S, any ]): void => {
      ReactNComponentWillUpdate(that);
      proto.componentWillUpdate.bind(that)(...args);
    };
    return true;
  }
  return false;
};


/**
 * Hack:
 * If we didn't find a lifecycle method on the instance, attempt to find it
 *   again after the sub class finishes its constructor.
 * Disabled because it makes me uncomfortable and doesn't pass synchronous unit
 *   tests anyway.
 */
const bindLifecycleMethods = (
  that: ReactNComponent | ReactNPureComponent,
): void => {

  if (
    !componentWillUnmountInstance(that) &&
    !componentWillUnmountPrototype(that)
  ) {
    /*
    setTimeout((): void => {
      componentWillUnmountInstance(this);
    }, 0);
    */
  }

  if (
    !componentWillUpdateInstance(that) &&
    !componentWillUpdatePrototype(that)
  ) {
    /*
    setTimeout((): void => {
      componentWillUpdateInstance(this);
    }, 0);
    */
  }
};



export class ReactNComponent<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends Component<P, S, SS> {

  public constructor(props: Readonly<P>, context?: any) {
    super(props, context);
    this._globalCallback = this._globalCallback.bind(this);
    bindLifecycleMethods(this);
  }

  public get dispatch(): Readonly<DispatcherMap<G, R>> {
    return ReactNDispatch<G, R>();
  }

  public get global(): Readonly<G> {
    return ReactNGlobal<G>(this);
  }

  public setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback: Callback<G> | null = null
  ): Promise<Readonly<G>> {
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
};

export class ReactNPureComponent<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
> extends PureComponent<P, S, SS> {

  public constructor(props: Readonly<P>, context?: any) {
    super(props, context);
    this._globalCallback = this._globalCallback.bind(this);
    bindLifecycleMethods(this);
  }

  public get dispatch(): Readonly<DispatcherMap<G, R>> {
    return ReactNDispatch<G, R>();
  }

  public get global(): Readonly<G> {
    return ReactNGlobal<G>(this);
  }

  public setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback: Callback<G> | null = null
  ): Promise<Readonly<G>> {
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
};
