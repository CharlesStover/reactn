import { expect } from 'chai';
import { createContext } from 'react';
import ReactNContext from './context';

describe('ReactN Context', () => {
  it('should be a React Context', () => {
    const reactContext = createContext(null);
    const reactContextPrototype = Object.getPrototypeOf(reactContext);
    const reactNContextPrototype = Object.getPrototypeOf(ReactNContext);
    expect(reactNContextPrototype).to.equal(reactContextPrototype);
  });
});
