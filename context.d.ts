import { Context } from 'react';
import GlobalStateManager from './global-state-manager';
interface TrueContext<T> extends Context<T> {
    _currentValue: T;
    _currentValue2: T;
}
declare const _default: TrueContext<GlobalStateManager<any, any>>;
export default _default;
