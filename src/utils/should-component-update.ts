import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import { ReactNCShouldComponentUpdate } from '../methods';
import React = require('react');


/*
type ShouldComponentUpdate<P extends {} = {}, S extends {} = {}> =
  (nextProps: P, nextState: S, context: any) => void;
*/



// this.shouldComponentUpdate on instance
/*
export const shouldComponentUpdateInstance = <
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
>(
  that: ReactNComponent<P, S, G, R, SS> | ReactNPureComponent<P, S, G, R, SS>,
): boolean => {
  if (Object.prototype.hasOwnProperty.call(that, 'shouldComponentUpdate')) {
    const instanceCwu: ShouldComponentUpdate<P, S> = that.shouldComponentUpdate;
    that.shouldComponentUpdate = (...args: [ P, S, any ]): void => {
      ReactNShouldComponentUpdate(that);
      instanceCwu(...args);
    };
    return true;
  }
  return false;
};
*/

// this.shouldComponentUpdate on prototype
export const shouldComponentUpdatePrototype = <
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
  const [ rVerMaj, rVerMin ] = React.version.split('.').map((v): number => parseInt(v));
  if (Object.prototype.hasOwnProperty.call(proto, 'shouldComponentUpdate')
    && ((rVerMaj > 16 || (rVerMaj === 16 && rVerMin >= 3)))) {
    that.shouldComponentUpdate = (...args: [ P, S, any ]): boolean => {
      ReactNCShouldComponentUpdate(that);
      return proto.shouldComponentUpdate.bind(that)(...args); // Returns outcome of shouldComponentUpdate method
    };
    return true;
  }
  return false;
};
