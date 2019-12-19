import * as methods from '../../../../src/methods';
import * as shouldComponentUpdate from '../../../../src/utils/should-component-update';



jest.mock('../../../../src/methods', () => ({
  ...methods,
  ReactNShouldComponentUpdate: jest.fn(methods.ReactNShouldComponentUpdate),
}));

jest.mock('../../../../src/utils/should-component-update', () => ({
  ...shouldComponentUpdate,
  shouldComponentUpdateInstance:
    jest.fn(shouldComponentUpdate.shouldComponentUpdateInstance),
  shouldComponentUpdatePrototype:
    jest.fn(shouldComponentUpdate.shouldComponentUpdatePrototype),
}));

export default function unmock() {
  jest.unmock('../../../../src/methods');
  jest.unmock('../../../../src/utils/should-component-update');
}
