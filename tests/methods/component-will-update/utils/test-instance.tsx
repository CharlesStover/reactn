import * as React from 'react';
import { render } from 'react-testing-library';
import { ReactNComponent } from '../../../../src/components';
import { ReactNComponentWillUpdate } from '../../../../src/methods';
import {
  componentWillUpdateInstance,
} from '../../../../src/utils/component-will-update';



interface P {
  n: number;
}

type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    const mockComponentWillUpdate: VoidFunction =
      jest.fn((): void => { });

    class TestComponent extends Component<P> {

      componentWillUpdate = mockComponentWillUpdate;

      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent n={1} />)
    testComponent.rerender(<TestComponent n={2} />);

    expect(ReactNComponentWillUpdate).toHaveBeenCalledTimes(1);
    // expect(ReactNComponentWillUpdate).toHaveBeenCalledWith();
    expect(componentWillUpdateInstance).toHaveBeenCalledTimes(1);
    // expect(componentWillUpdateInstance).toHaveBeenCalledWith();
    expect(mockComponentWillUpdate).toHaveBeenCalledTimes(1);
    expect(mockComponentWillUpdate).toHaveBeenCalledWith();
  };
};
