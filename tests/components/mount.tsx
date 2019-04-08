import { render } from 'react-testing-library';
import React, { ComponentClass } from '../../build';
import { GS, R } from '../utils/initial';



export default (TestComponent: ComponentClass<{}, {}, GS, R>): void => {

  it('should mount without error', (): void => {
    render(<TestComponent />);
  });
};
