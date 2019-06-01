import * as React from 'react';
import { render } from 'react-testing-library';
import { ReactNComponent } from '../../../../src/components';
import { ReactNComponentWillUpdate } from '../../../../src/methods';
import {
  componentWillUpdatePrototype,
} from '../../../../src/utils/component-will-update';



interface P {
  n: number;
}

type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    const mockComponentWillUpdate: VoidFunction = jest.fn();

    class TestComponent extends Component<P> {
      componentWillUpdate() {
        mockComponentWillUpdate();
      }
      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent n={1} />);
    testComponent.rerender(<TestComponent n={2} />);

    expect(ReactNComponentWillUpdate).toHaveBeenCalledTimes(1);
    // expect(ReactNComponentWillUpdate).toHaveBeenCalledWith();
    expect(componentWillUpdatePrototype).toHaveBeenCalledTimes(1);
    // expect(componentWillUpdatePrototype).toHaveBeenCalledWith();
    expect(mockComponentWillUpdate).toHaveBeenCalledTimes(1);
  };
};
