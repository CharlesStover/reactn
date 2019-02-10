import { expect } from 'chai';
import { Component, PureComponent, resetGlobal } from '../../index';

type DescribeBlock = () => void;
type ComponentType = typeof Component | typeof PureComponent;

export default function shouldHaveGlobalProperties(
  ComponentType: ComponentType
): DescribeBlock {
  return (): void => {

    afterEach(resetGlobal);

    it('should have global properties', (): void => {
      expect(ComponentType.prototype.componentWillUnmount).to.be.a('function');
      // _globalCallback is a prototype method on components but an instance
      //    method on the decorator
      // expect(ComponentType.prototype._globalCallback).to.be.a('function');
      expect(ComponentType.prototype.global).to.be.an('object');
      expect(ComponentType.prototype.setGlobal).to.be.a('function');
    });

  };
}
