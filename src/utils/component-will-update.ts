import { Reducers, State } from '../../default';
import { ReactNComponent, ReactNPureComponent } from '../../types/component';
import { ReactNComponentWillUpdate } from '../methods';
import React = require('react');


/*
type ComponentWillUpdate<P extends {} = {}, S extends {} = {}> =
  (nextProps: P, nextState: S, context: any) => void;
*/



// this.componentWillUpdate on instance
/*
export const componentWillUpdateInstance = <
  P extends {} = {},
  S extends {} = {},
  G extends {} = State,
  R extends {} = Reducers,
  SS = any,
>(
  that: ReactNComponent<P, S, G, R, SS> | ReactNPureComponent<P, S, G, R, SS>,
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
*/

// this.componentWillUpdate on prototype
export const componentWillUpdatePrototype = <
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
  if (Object.prototype.hasOwnProperty.call(proto, 'componentWillUpdate')
    && ((rVerMaj < 16 || (rVerMaj === 16 && rVerMin < 3)))) { // Using old react version)
    that.componentWillUpdate = (...args: [ P, S, any ]): void => {
      ReactNComponentWillUpdate(that);
      proto.componentWillUpdate.bind(that)(...args);
    };
    return true;
  }
  return false;
};
