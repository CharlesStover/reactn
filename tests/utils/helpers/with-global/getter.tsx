import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { createProvider, setGlobal, withGlobal } from '../../../../index';

const TEST_KEY = 'withGlobal';
const TEST_VALUE = 1;

interface TestProps {
  [TEST_KEY]: number;
}

export default function testGetter(withContext) {

  it('should map state to props', () => {

    const initialState = {
      [TEST_KEY]: TEST_VALUE
    };

    let Provider;
    if (withContext) {
      Provider = createProvider(initialState);
    }
    else {
      setGlobal(initialState);
    }

    class TestComponent extends React.Component<TestProps, {}> {
      render() {
        return this.props[TEST_KEY];
      }
    }

    // Map state to props.
    const TestComponentWithGlobal =
      (withContext ? Provider.withGlobal : withGlobal)(
      global => ({
        [TEST_KEY]: global[TEST_KEY]
      })
    )(TestComponent);

    const value = TestRenderer.create(
      withContext ?
        <Provider>
          <TestComponentWithGlobal />
        </Provider> :
        <TestComponentWithGlobal />
    ).toJSON();
    expect(value).to.equal(TEST_VALUE.toString());
  });
};
