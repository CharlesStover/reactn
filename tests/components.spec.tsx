import { Component, PureComponent, resetGlobal } from '../index';

// @ts-ignore: Missing --jsx flag.
import testComponentWillUnmount from './utils/components/component-will-unmount';
// @ts-ignore: Missing --jsx flag.
import testGlobal from './utils/components/global';
// @ts-ignore: Missing --jsx flag.
import testRender from './utils/components/render';
// @ts-ignore: Missing --jsx flag.
import testSetGlobal from './utils/components/set-global';

// Full test suite for a ReactN component.
const testSuite = Super => () => {
  testRender(Super);
  testComponentWillUnmount(Super);
  testGlobal(Super);
  testSetGlobal(Super);
};

describe('ReactN Components', () => {
  afterEach(resetGlobal);
  describe('Component', testSuite(Component));
  describe('PureComponent', testSuite(PureComponent));
});
