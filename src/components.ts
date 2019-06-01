import { Reducers, State } from '../default';
import Callback from '../types/callback';
import { DispatcherMap } from '../types/dispatchers';
import NewGlobalState from '../types/new-global-state';
import { Component, PureComponent } from 'react';
import {
  ReactNDispatch,
  ReactNGlobal,
  ReactNGlobalCallback,
  ReactNSetGlobal,
} from './methods';
import bindLifecycleMethods from './utils/bind-lifecycle-methods';



// TODO -- https://github.com/CharlesStover/reactn/issues/14
const isComponentDidMount = false;
const isComponentDidUpdate = false;
const isSetGlobalCallback = false;



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
