import { render } from '@testing-library/react';
import * as React from 'react';
import { ReactNComponent } from '../../../../src/components';
import { ReactNComponentWillUnmount } from '../../../../src/methods';



type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    const mockComponentWillUnmount: VoidFunction =
      jest.fn((): void => { });

    class TestComponent extends Component {

      componentWillUnmount = mockComponentWillUnmount;

      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent />)
    testComponent.unmount();

    expect(ReactNComponentWillUnmount).toHaveBeenCalledTimes(1);
    // expect(ReactNComponentWillUnmount).toHaveBeenCalledWith()
    // expect(componentWillUnmountInstance).toHaveBeenCalledTimes(1);
    // expect(componentWillUnmountInstance).toHaveBeenCalledWith();
    expect(mockComponentWillUnmount).toHaveBeenCalledTimes(1);
    expect(mockComponentWillUnmount).toHaveBeenCalledWith();
  };
};
