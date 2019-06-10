import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import { ReactNComponentWillUnmount } from '../methods';



// type VoidFunction = () => void;



// this.componentWillUnmount on instance
/*
export const componentWillUnmountInstance = <
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
>(
  that: ReactNComponent<P, S, G, R, SS> | ReactNPureComponent<P, S, G, R, SS>,
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
*/

// this.componentWillUnmount on prototype
export const componentWillUnmountPrototype = <
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
>(
  that: ReactNComponent<P, S, G, R, SS> | ReactNPureComponent<P, S, G, R, SS>,
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
