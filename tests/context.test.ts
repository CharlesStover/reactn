import { Context, createContext } from 'react';
import ReactNContext from '../src/context';
import defaultGlobalStateManager from '../src/default-global-state-manager';



describe('ReactN Context', (): void => {

  it('should be a React Context', (): void => {
    const reactContext: Context<null> = createContext(null);
    const ReactContextPrototype = Object.getPrototypeOf(reactContext);
    const ReactNContextPrototype = Object.getPrototypeOf(ReactNContext);
    expect(ReactNContextPrototype).toEqual(ReactContextPrototype);
  });

  it('should default to the default global state manager', (): void => {
    expect(ReactNContext._currentValue).toEqual(defaultGlobalStateManager);
    expect(ReactNContext._currentValue2).toEqual(defaultGlobalStateManager);
  });
});
