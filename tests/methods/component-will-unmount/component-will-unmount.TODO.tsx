// import unmock from './utils/mock-component-will-unmount';
import { ReactNComponent, ReactNPureComponent } from '../../../src/components';
// import testPrototype from './utils/test-prototype';
import testUndefined from './utils/test-undefined';



describe('componentWillUnmount', (): void => {

  /*
  afterAll((): void => {
    unmock();
  });
  */

  describe('undefined componentWillUnmount', (): void => {
    it('will fire on Components', testUndefined(ReactNComponent));
    it('will fire on PureComponents', testUndefined(ReactNPureComponent));
  });

  /*
  This works, but the jest.mocks for the tested helper functions are not
    binding correctly.
  describe('prototype componentWillUnmount', (): void => {
    it('will fire on Components', testPrototype(ReactNComponent));
    it('will fire on PureComponents', testPrototype(ReactNPureComponent));
  });
  */

  /*
  describe('instance componentWillUnmount', (): void => {
    it('will fire on Components', testInstance(ReactNComponent));
    it('will fire on PureComponents', testInstance(ReactNPureComponent));
  });
  */
});
