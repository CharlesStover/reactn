import { render } from 'react-testing-library';
import React, { ComponentClass } from '../../build';
import spyOn from '../utils/spy-on-global-state-manager';



export default (
  source: string,
  TestComponent: ComponentClass,
  spyCwu: jest.Mock<void, []>,
): void => {

  const spy = spyOn('removePropertyListener');

  it(`should maintain componentWillUpdate behavior on ${source}`, (): void => {
    expect(spyCwu).not.toHaveBeenCalled();
    const { unmount } = render(<TestComponent />);
    expect(spyCwu).not.toHaveBeenCalled();
    unmount();
    expect(spyCwu).toHaveBeenCalledTimes(1);
  });

  it(`should unsubscribe when unmounting on ${source}`, (): void => {
    expect(spy.removePropertyListener).not.toHaveBeenCalled();
    const { unmount } = render(<TestComponent />);
    expect(spy.removePropertyListener).not.toHaveBeenCalled();
    unmount();
    expect(spy.removePropertyListener).toHaveBeenCalledTimes(1);
    /*
    TODO: Determine how to get the INSTANCE.
    expect(spy.removePropertyListener).toHaveBeenCalledWith(
      INSTANCE._globalCallback
    );
    */
  });
};
