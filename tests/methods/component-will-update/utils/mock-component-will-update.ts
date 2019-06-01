import * as methods from '../../../../src/methods';
import * as componentWillUpdate from '../../../../src/utils/component-will-update';



jest.mock('../../../../src/methods', () => ({
  ...methods,
  ReactNComponentWillUpdate: jest.fn(methods.ReactNComponentWillUpdate),
}));

jest.mock('../../../../src/utils/component-will-update', () => ({
  ...componentWillUpdate,
  componentWillUpdateInstance:
    jest.fn(componentWillUpdate.componentWillUpdateInstance),
  componentWillUpdatePrototype:
    jest.fn(componentWillUpdate.componentWillUpdatePrototype),
}));

export default function unmock() {
  jest.unmock('../../../../src/methods');
  jest.unmock('../../../../src/utils/component-will-update');
}
