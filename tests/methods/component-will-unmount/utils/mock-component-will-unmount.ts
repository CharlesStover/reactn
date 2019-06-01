import * as methods from '../../../../src/methods';
import * as componentWillUnmount from '../../../../src/utils/component-will-unmount';



jest.mock('../../../../src/methods', () => ({
  ...methods,
  ReactNComponentWillUnmount: jest.fn(methods.ReactNComponentWillUnmount),
}));

jest.mock('../../../../src/utils/component-will-unmount', () => ({
  ...componentWillUnmount,
  componentWillUnmountInstance:
    jest.fn(componentWillUnmount.componentWillUnmountInstance),
  componentWillUnmountPrototype:
    jest.fn(componentWillUnmount.componentWillUnmountPrototype),
}));

export default function unmock() {
  jest.unmock('../../../../src/methods');
  jest.unmock('../../../../src/utils/component-will-unmount');
}
