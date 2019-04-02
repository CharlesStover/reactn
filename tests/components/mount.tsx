import { render } from 'react-testing-library';
import React, { Component } from '../../build/index';
import { GS, R } from '../utils/initial';
import Props from './props';



export default (_Super: typeof Component): void => {

  class TestComponent extends _Super<Props, {}, GS, R> {

    componentDidMount() {
      this.dispatch.append('ab', 'cd');
    }

    componentDidUpdate(_prevProps: Props, nextProps: Props) {
      this.dispatch.increment(nextProps.b);
    }

    componentWillUnmount() {
      this.dispatch.toggle();
    }

    handleClick = () => {
      this.setGlobal({
        x: false,
        y: 0,
        z: 'string',
      });
    };

    render() {
      return this.global.x;
    }
  }

  it('should mount without error', (): void => {
    render(<TestComponent />);
  });
};
