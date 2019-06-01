import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import {
  ReactNComponentWillUnmount,
  ReactNComponentWillUpdate,
} from '../methods';
import {
  // componentWillUnmountInstance,
  componentWillUnmountPrototype,
} from './component-will-unmount';
import {
  // componentWillUpdateInstance,
  componentWillUpdatePrototype,
} from './component-will-update';



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
    // !componentWillUpdateInstance(that) &&
    !componentWillUpdatePrototype(that)
  ) {

    // Warning: If componentWillUpdate is defined in the constructor (or as an
    //   arrow function), this will be overridden.
    that.componentWillUpdate = (): void => {
      ReactNComponentWillUpdate(that);
    };
  }
};
