import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

export default function itShouldHaveComponentWillUnmount(
  Super: typeof React.Component
) {

  describe('componentWillUnmount', () => {

    it('should exist on the super class', () => {
      expect(Super.prototype.componentWillUnmount).to.be.a('function');
    });



    // Can't access a component's instance properties in super to make this
    //   work.
    it.skip('should exist on sub classes with instances', () => {

      // Declare componentWillUnmount on the instance.
      let instanceWillUnmount = 0;
      const instanceComponentWillUnmount = () => {
        instanceWillUnmount++;
      };

      class TestInstance extends Super {

        componentWillUnmount = instanceComponentWillUnmount;

        render() {
          return null;
        }
      }

      // @ts-ignore: Missing --jsx flag.
      const instance = TestRenderer.create(<TestInstance />);

      // Expect the super class to have created a new componentWillUnmount.
      // @ts-ignore: ReactTestInstance not correctly identified as React
      //   Component.
      expect(instance.getInstance().componentWillUnmount)
        .not.to.equal(instanceComponentWillUnmount);

      // Expect the sub class's componentWillUnmount to have been called.
      instance.unmount();
      expect(instanceWillUnmount).to.equal(1);
    });



    it('should exist on sub classes with prototypes', () => {

      // Declare componentWillUnmount on the prototype.
      let prototypeWillUnmount = 0;
      class TestPrototype extends Super {

        componentWillUnmount() {
          prototypeWillUnmount++;
        }

        render() {
          return null;
        }
      }

      // @ts-ignore: Missing --jsx flag.
      const instance = TestRenderer.create(<TestPrototype />);

      // Expect the super class to have created a new componentWillUnmount.
      // @ts-ignore: ReactTestInstance not correctly identified as React
      //   Component.
      expect(instance.getInstance().componentWillUnmount).to.be.a('function');

      // Expect the sub class's componentWillUnmount to have been called.
      instance.unmount();
      expect(prototypeWillUnmount).to.equal(1);
    });

  });

};
