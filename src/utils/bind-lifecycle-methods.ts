import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import React = require('react');
import {
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
  ReactNShouldComponentUpdate,
} from '../methods';
import {
  // componentWillUnmountInstance,
  componentWillUnmountPrototype,
} from './component-will-unmount';
import {
  // componentWillUpdateInstance,
  componentWillUpdatePrototype,
} from './component-will-update';
import {
  // shouldComponentUpdateInstance,
  shouldComponentUpdatePrototype,
} from './should-component-update';



export default function bindLifecycleMethods<
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
>(
  that: ReactNComponent<P, S, G, R, SS> | ReactNPureComponent<P, S, G, R, SS>,
): void {

  if (
    // !componentWillUnmountInstance(that) &&
    !componentWillUnmountPrototype(that)
  ) {

    // Warning: If componentWillUnmount is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.componentWillUnmount = (): void => {
      ReactNComponentWillUnmount(that);
    };
  }

  const [ rVerMaj, rVerMin ] = React.version.split('.').map((v): number => parseInt(v));
  const isPureComponent = React.PureComponent && (that instanceof React.PureComponent);
  const isUsingOldReact = rVerMaj < 16 || (rVerMaj === 16 && rVerMin < 3);

  if (
    // !componentWillUpdateInstance(that) &&
    isUsingOldReact && !componentWillUpdatePrototype(that)
  ) {
    // This will fire if using an Old React Version
    // Warning: If componentWillUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.componentWillUpdate = (): void => {
      ReactNComponentWillUpdate(that);
    };
  }

  if (
    // !componentWillUpdateInstance(that) &&
    !isUsingOldReact && isPureComponent && !componentWillUpdatePrototype(that)
  ) {
    // This will fire if using New React Versions and component is Pure.
    // TODO: Firgure out a way to move out UNSAFE methods as can't use shouldComponentUpdate on Pure Components.
    // Warning: If UNSAFE_componentWillUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.UNSAFE_componentWillUpdate = (): void => {
      ReactNComponentWillUpdate(that);
    };
  }

  if (
    // !shouldComponentUpdateInstance(that) &&
    !isUsingOldReact && !isPureComponent && !shouldComponentUpdatePrototype(that)
  ) {
    // This will fire if using New React Versions and regular components
    // Warning: If shouldComponentUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.shouldComponentUpdate = (): boolean => {
      ReactNShouldComponentUpdate(that);
      return true; // If shouldComponentUpdate is not defined it defaults to true
    };
  }
};
