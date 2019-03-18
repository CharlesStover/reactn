import { expect } from 'chai';
import { Context, createContext } from 'react';
import ReactNContext from './context';
import defaultGlobalStateManager from './default-global-state-manager';

describe('ReactN Context', () => {

  it('should be a React Context', () => {
    const reactContext: Context<null> = createContext(null);
    expect(
      Object.getPrototypeOf(ReactNContext),
    ).to.equal(
      Object.getPrototypeOf(reactContext),
    );
  });

  it('should default to the default global state manager', () => {
    expect(ReactNContext._currentValue).to.equal(defaultGlobalStateManager);
    expect(ReactNContext._currentValue2).to.equal(defaultGlobalStateManager);
  });
});
