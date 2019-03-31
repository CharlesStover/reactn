import React from '../../build/index';
import { ComponentClass } from '../../build/index';
import { GS, R } from '../utils/initial';



type VoidFunction = () => void;



export default (TestComponent: ComponentClass<{}, {}, GS, R>): VoidFunction =>
  (): void => {
    it.skip('should render without crashing', (): void => {
      <TestComponent />
    });
  };
