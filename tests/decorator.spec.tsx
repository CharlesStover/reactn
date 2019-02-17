import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import decorator, { getGlobal, resetGlobal, setGlobal } from '../index';

const TEST_KEY = 'x';
const TEST_VALUE = 1;

describe('@reactn Decorator', () => {

  beforeEach(() => {
    setGlobal({
      [TEST_KEY]: TEST_VALUE
    });
  });

  afterEach(resetGlobal);



  it('should render without crashing', () => {

    @decorator
    class DecoratedComponent extends React.Component<{}, {}> {
      render() {
    
        // @ts-ignore: ReactN properties missing from decorated definition.
        return this.global[TEST_KEY];
      }
    }

    // @ts-ignore: Missing --jsx flag.
    const value = TestRenderer.create(<DecoratedComponent />).toJSON();
    expect(value).to.equal(TEST_VALUE.toString());
  });



  describe('componentWillUnmount', () => {



    it('should exist on a decorated class', () => {

      @decorator
      class DecoratedComponent extends React.Component<{}, {}> {
        render() {

          // @ts-ignore: ReactN properties missing from decorated definition.
          return this.global[TEST_KEY];
        }
      }

      expect(DecoratedComponent.prototype.componentWillUnmount).to.be.a('function');
    });



    it('should exist on a decorated class with instances', () => {

      let instanceWillUnmount = 0;

      // @ts-ignore: componentWillUnmount incompatible with decorator
      //   definition.
      @decorator
      class DecoratedComponent extends React.Component<{}, {}> {

        componentWillUnmount = () => {
          instanceWillUnmount++;
        };

        render() {

          // @ts-ignore: ReactN properties missing from decorated definition.
          return this.global[TEST_KEY];
        }
      }

      // @ts-ignore: Missing --jsx flag.
      TestRenderer.create(<DecoratedComponent />).unmount();

      // Decorated class's componentWillUnmount should still be called.
      expect(instanceWillUnmount).to.equal(1);
    });



    it('should exist on a decorated class with prototypes', () => {

      let prototypeWillUnmount = 0;

      // @ts-ignore: componentWillUnmount incompatible with decorator
      //   definition.
      @decorator
      class DecoratedComponent extends React.Component<{}, {}> {

        componentWillUnmount() {
          prototypeWillUnmount++;
        }

        render() {

          // @ts-ignore: ReactN properties missing from decorated definition.
          return this.global[TEST_KEY];
        }
      }

      // @ts-ignore: Missing --jsx flag.
      TestRenderer.create(<DecoratedComponent />).unmount();

      // Decorated class's componentWillUnmount should still be called.
      expect(prototypeWillUnmount).to.equal(1);
    });
  });



  it('should support global', () => {

    @decorator
    class DecoratedComponent extends React.Component<{}, {}> {
      render() {

        // @ts-ignore: global incompatible with decorator definition.
        return this.global[TEST_KEY];
      }
    }

    // @ts-ignore
    const value = TestRenderer.create(<DecoratedComponent />).toJSON();

    // The ReactN component should have access to that value.
    expect(value).to.equal(TEST_VALUE.toString());
  });



  it('should support setGlobal', () => {
    const NEW_TEST_VALUE = 2;

    const callback = function() {
      callback.calls++;
    };
    callback.calls = 0;

    // ReactN component
    // @ts-ignore: componentDidMount incompatible with decorator definition.
    @decorator
    class DecoratedComponent extends React.Component<{}, {}> {

      // Update the state on mount.
      componentDidMount() {

        // The state should receive a value.
        // @ts-ignore: setGlobal incompatible with decorator definition.
        this.setGlobal(
          { [TEST_KEY]: NEW_TEST_VALUE },
          callback
        );
      }

      render() {
        return null;
      }
    }

    // @ts-ignore
    TestRenderer.create(<DecoratedComponent />);

    // The state should receive a value.
    expect(getGlobal()[TEST_KEY]).to.equal(NEW_TEST_VALUE);
    expect(callback.calls).to.equal(1);
  });

});
