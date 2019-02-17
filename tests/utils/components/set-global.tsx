import { expect } from 'chai';
import * as TestRenderer from 'react-test-renderer';
import { getGlobal } from '../../../index';

const TEST_KEY = 'x';
const TEST_VALUE = 1;

// It should be able to set global properties.
export default function itShouldSupportSetGlobal(Super) {

  it('should support setGlobal', () => {

    const callback = function() {
      callback.calls++;
    };
    callback.calls = 0;

    // The state should start empty.
    expect(getGlobal()[TEST_KEY]).to.be.undefined;

    // ReactN component
    class TestComponent extends Super {

      // Update the state on mount.
      componentDidMount() {

        // The state should receive a value.
        this.setGlobal(
          { [TEST_KEY]: TEST_VALUE },
          callback
        );
      }

      render() {
        return null;
      }
    }

    // @ts-ignore
    TestRenderer.create(<TestComponent />);

    // The state should receive a value.
    expect(getGlobal()[TEST_KEY]).to.equal(TEST_VALUE);
    expect(callback.calls).to.equal(1);
  });
};
