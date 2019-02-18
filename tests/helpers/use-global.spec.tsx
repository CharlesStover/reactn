import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { getGlobal, resetGlobal, setGlobal, useGlobal } from '../../index';

describe('useGlobal', () => {

  afterEach(resetGlobal);

  describe('reducer', () => {

    //  Invariant Violation: Hooks can only be called inside the body of a function component.
    it.skip('should return a local reducer', () => {
      const globalReducer = (global, _arg1, _arg2) => global;
      let localReducer = null;
      function TestComponent() {
        localReducer = useGlobal(globalReducer);
        return null;
      }
      TestRenderer.create(<TestComponent />);
      expect(localReducer).to.be.a('function');
      expect(localReducer.length).to.equal(globalReducer.length - 1);
    });

    //  Invariant Violation: Hooks can only be called inside the body of a function component.
    it.skip('should update the global state', () => {
      setGlobal({ value: 0 });
      let calls = 0;
      const globalReducer = (global, arg1, arg2 = 0) => {
        calls++;
        return {
          value: global.value + arg1 - arg2
        };
      };
      function TestComponent() {
        const [ value ] = useGlobal<number>('value');
        const localReducer = useGlobal(globalReducer);
        if (value < 7) {
          // 0, 1, 3, 7
          localReducer(value + 2, 1);
        }
        return null;
      }
      TestRenderer.create(<TestComponent />);
      expect(calls).to.equal(3);
      expect(getGlobal().value).to.equal(7);
    });

  });

  it('should subscribe to the global state');

});
