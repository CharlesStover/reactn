import decorator from '../build/index';
import commonjs = require('../build/index');

describe('@reactn decorator', (): void => {

  it('should be the CommonJS export and the default export', (): void => {
    expect(commonjs).toEqual(decorator);
  });

  it('should be a function with 1 argument', (): void => {
    expect(decorator).toEqual(expect.any(Function));
    expect(decorator).toHaveLength(1);
  });

  it.skip('should do more', (): void => {
  });
});
