import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import {
  ReactNComponentWillUnmount,
  ReactNShouldComponentUpdate,
} from '../methods';
import {
  // componentWillUnmountInstance,
  componentWillUnmountPrototype,
} from './component-will-unmount';
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

  if (
    // !shouldComponentUpdateInstance(that) &&
    !shouldComponentUpdatePrototype(that)
  ) {

    // Warning: If shouldComponentUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.shouldComponentUpdate = (): boolean => {
      ReactNShouldComponentUpdate(that);
      return true; // If shouldComponentUpdate is not defined it defaults to true
    };
  }
};
