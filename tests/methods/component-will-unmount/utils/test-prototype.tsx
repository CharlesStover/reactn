import * as React from 'react';
import { render } from 'react-testing-library';
import { ReactNComponent } from '../../../../src/components';
import { ReactNComponentWillUnmount } from '../../../../src/methods';
import {
  componentWillUnmountPrototype,
} from '../../../../src/utils/component-will-unmount';



type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    const mockComponentWillUnmount: VoidFunction = jest.fn();

    class TestComponent extends Component {
      componentWillUnmount() {
        mockComponentWillUnmount();
      }
      render() {
        return null;
      }
    }

    const { unmount } = render(<TestComponent />)
    unmount();

    expect(ReactNComponentWillUnmount).toHaveBeenCalledTimes(1);
    // expect(ReactNComponentWillUnmount).toHaveBeenCalledWith();
    expect(componentWillUnmountPrototype).toHaveBeenCalledTimes(1);
    // expect(componentWillUnmountPrototype).toHaveBeenCalledWith();
    expect(mockComponentWillUnmount).toHaveBeenCalledTimes(1);
  };
};
