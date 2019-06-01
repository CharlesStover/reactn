import * as React from 'react';
import { render } from 'react-testing-library';
import { ReactNComponent } from '../../../../src/components';
import { ReactNComponentWillUnmount } from '../../../../src/methods';



type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    class TestComponent extends Component {
      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent />)
    testComponent.unmount();

    expect(ReactNComponentWillUnmount).toHaveBeenCalledTimes(1);
    // expect(ReactNComponentWillUnmount).toHaveBeenCalledWith();
  };
};
