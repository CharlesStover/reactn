import React, { Component } from '../../build/index';
import { GS, R } from '../utils/initial';


type VoidFunction = () => void;


export default (TestComponent: Component<{}, {}, GS, R>): VoidFunction =>
  (): void => {
    it.skip('should render without crashing', (): void => {
      <TestComponent />
    });
  };
