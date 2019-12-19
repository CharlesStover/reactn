import { render } from '@testing-library/react';
import * as React from 'react';
import { ReactNComponent } from '../../../../src/components';
import { ReactNShouldComponentUpdate } from '../../../../src/methods';



interface P {
  n: number;
}

type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    class TestComponent extends Component<P> {
      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent n={1} />)
    testComponent.rerender(<TestComponent n={2} />);
 
    expect(ReactNShouldComponentUpdate).toHaveBeenCalledTimes(1);
    // expect(ReactNShouldComponentUpdate).toHaveBeenCalledWith();
  };
};
