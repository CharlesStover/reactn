import { Context, createContext } from 'react';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager from './global-state-manager';

type AnyGSM = GlobalStateManager<any, any>;

interface TrueContext<T> extends Context<T> {
  _currentValue: T;
  _currentValue2: T;
}

const getContext = (): TrueContext<AnyGSM> => {
  if (typeof createContext === 'function') {
    return createContext(defaultGlobalStateManager) as TrueContext<AnyGSM>;
  }
  return null;
};

export default getContext();
