import { render } from '@testing-library/react';
import * as React from 'react';
import { ReactNComponent } from '../../../../src/components';
import { ReactNShouldComponentUpdate } from '../../../../src/methods';
import {
  shouldComponentUpdatePrototype,
} from '../../../../src/utils/should-component-update';



interface P {
  n: number;
}

type VoidFunction = () => void;



export default function testUndefined(
  Component: typeof ReactNComponent,
): VoidFunction {
  return (): void => {

    const mockShouldComponentUpdate: VoidFunction = jest.fn();

    class TestComponent extends Component<P> {
      shouldComponentUpdate() {
        mockShouldComponentUpdate();
      }
      render() {
        return null;
      }
    }

    const testComponent = render(<TestComponent n={1} />);
    testComponent.rerender(<TestComponent n={2} />);

    expect(ReactNShouldComponentUpdate).toHaveBeenCalledTimes(1);
    // expect(ReactNShouldComponentUpdate).toHaveBeenCalledWith();
    expect(shouldComponentUpdatePrototype).toHaveBeenCalledTimes(1);
    // expect(shouldComponentUpdatePrototype).toHaveBeenCalledWith();
    expect(mockShouldComponentUpdate).toHaveBeenCalledTimes(1);
  };
};
