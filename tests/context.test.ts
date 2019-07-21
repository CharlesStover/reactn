import { Context, createContext } from 'react';
import ReactNContext from '../src/context';
import defaultGlobalStateManager from '../src/default-global-state-manager';
import { hasContext } from './utils/react-version';



describe('ReactN Context', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    it('should require Context', (): void => {
      expect(ReactNContext).toBe(null);
    });
    return;
  }



  it('should be a React Context', (): void => {
    const reactContext: Context<null> = createContext(null);
    const ReactContextPrototype = Object.getPrototypeOf(reactContext);
    const ReactNContextPrototype = Object.getPrototypeOf(ReactNContext);
    expect(ReactNContextPrototype).toBe(ReactContextPrototype);
  });

  it('should default to the default global state manager', (): void => {
    expect(ReactNContext._currentValue)
      .toStrictEqual(defaultGlobalStateManager);

    // React 16.3 does not have a _currentValue2.
    if (ReactNContext._currentValue2) {
      expect(ReactNContext._currentValue2)
        .toStrictEqual(defaultGlobalStateManager);
    }
  });
});
