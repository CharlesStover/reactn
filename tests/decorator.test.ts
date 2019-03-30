import { expect } from 'chai';
import decorator from '../build/index';
import commonjs = require('../build/index');

describe('@reactn decorator', (): void => {

  it('should be the CommonJS export and the default export', (): void => {
    expect(commonjs).to.equal(decorator);
  });

  it('should be a function with 1 argument', (): void => {
    expect(decorator).to.be.a('function');
    expect(decorator.length).to.equal(1);
  });

  it.skip('should do more', (): void => {
  });
});
