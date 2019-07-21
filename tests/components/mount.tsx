import { render } from '@testing-library/react';
import React, { ComponentClass } from '../../build';
import { G, R } from '../utils/initial';



export default (TestComponent: ComponentClass<{}, {}, G, R>): void => {

  it('should mount without error', (): void => {
    render(<TestComponent />);
  });
};
