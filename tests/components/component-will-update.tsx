import { render } from 'react-testing-library';
import React, { ComponentClass } from '../../build';
import { G, R } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';
import Props from './props';



export default (
  source: string,
  TestComponent: ComponentClass<Props, {}, G, R>,
  spyCwu: jest.Mock<void, []>,
): void => {

  const spy = spyOn('removePropertyListener');

  it(`should maintain componentWillUpdate behavior on ${source}`, (): void => {
    const { rerender } = render(<TestComponent a={false} />);
    rerender(<TestComponent a={true} />);
    expect(spyCwu).toHaveBeenCalledTimes(1);
  });

  it(`should unsubscribe when updating on ${source}`, (): void => {
    const { rerender } = render(<TestComponent a={false} />);
    expect(spy.removePropertyListener).not.toHaveBeenCalled();
    rerender(<TestComponent a={true} />);
    expect(spy.removePropertyListener).toHaveBeenCalledTimes(1);
    /*
    TODO: Determine how to get the INSTANCE.
    expect(spy.removePropertyListener).toHaveBeenCalledWith(
      INSTANCE._globalCallback
    );
    */
  });
};
