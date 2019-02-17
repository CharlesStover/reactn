import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {
  createProvider, getGlobal, setGlobal, withGlobal
} from '../../../../index';

const TEST_KEY = 'withGlobal';
const TEST_VALUE = 2;

interface TestProps {
  [TEST_KEY]: number;
  setTestProp: (value: number) => void;
}

export default function testSetter(withContext) {

  it('should map dispatch to props', () => {

    // Start with the wrong value.
    let Provider;
    if (withContext) {
      Provider = createProvider({
        [TEST_KEY]: null
      });
    }
    else {
      setGlobal({
        [TEST_KEY]: null
      });
      expect(getGlobal()[TEST_KEY]).to.equal(null);
    }

    // Have the component update the state on mount.
    class TestComponent extends React.Component<TestProps, {}> {

      componentDidMount() {
        this.props.setTestProp(TEST_VALUE);
      }

      render() {
        return this.props[TEST_KEY];
      }
    }

    // Map state and dispatch to props.
    const TestComponentWithGlobal =
      (withContext ? Provider.withGlobal : withGlobal)(
        global => ({
          [TEST_KEY]: global[TEST_KEY]
        }),
        setGlobal => ({
          setTestProp: (value: number): void => {
            setGlobal({ [TEST_KEY]: value });
          }
        })
      )(TestComponent);

    // Expect the state value to have changed.
    const value = TestRenderer.create(
      withContext ?
        <Provider>
          <TestComponentWithGlobal />
        </Provider> :
        <TestComponentWithGlobal />
    ).toJSON();
    expect(value).to.equal(TEST_VALUE.toString());

  });
}
