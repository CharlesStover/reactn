import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import React = require('react');
import {
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
  ReactNCShouldComponentUpdate,
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

  if (
    // !componentWillUpdateInstance(that) &&
    !componentWillUpdatePrototype(that) &&
    ((rVerMaj < 16 || (rVerMaj === 16 && rVerMin < 3))) // Using old react version
  ) {
    that.componentWillUpdate = (): void => {
      ReactNComponentWillUpdate(that);
    };
    // Warning: If componentWillUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
  }

  if (
    // !shouldComponentUpdateInstance(that) &&
    !shouldComponentUpdatePrototype(that) &&
    ((rVerMaj > 16 || (rVerMaj === 16 && rVerMin >= 3))) // Using new react version with deprecated componentWillUpdate
  ) {

    // Warning: If shouldComponentUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.shouldComponentUpdate = (): boolean => {
      ReactNCShouldComponentUpdate(that);
      return true; // If shouldComponentUpdate is not defined it defaults to true
    };
  }
};
