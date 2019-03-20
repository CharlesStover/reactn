import { Context, createContext } from 'react';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';

interface TrueContext<T> extends Context<T> {
  _currentValue: T;
  _currentValue2: T;
}

type RSA = Record<number | string, any>;

export default (
  createContext<GlobalStateManager<RSA>>(defaultGlobalStateManager)
) as TrueContext<GlobalStateManager<RSA>>;
