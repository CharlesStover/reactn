import { expect } from 'chai';
import * as TestRenderer from 'react-test-renderer';
import { getGlobal, setGlobal } from '../../../index';

const TEST_KEY = 'x';
const TEST_VALUE = 1;

// It should be able to get global properties.
export default function itShouldSupportGlobal(Super) {

  it('should support global', () => {

    // The state should start empty.
    expect(getGlobal()[TEST_KEY]).to.be.undefined;

    // The state should receive a value.
    setGlobal({ [TEST_KEY]: TEST_VALUE });
    expect(getGlobal()[TEST_KEY]).to.equal(TEST_VALUE);

    // ReactN component
    class TestComponent extends Super {
      render() {
        return this.global[TEST_KEY];
      }
    }

    // @ts-ignore
    const value = TestRenderer.create(<TestComponent />).toJSON();

    // The ReactN component should have access to that value.
    expect(value).to.equal(TEST_VALUE.toString());
  });
};
