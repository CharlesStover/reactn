import { expect } from 'chai';
import makeIterable from '../../../src/helpers/utils/make-iterable';

describe('makeIterable', () => {
  it('should make a function iterable', () => {
    function x() { }
    makeIterable(x, 1, 'ABC', true, x);
    // @ts-ignore: () => {} is not an array
    const [ num, str, bool, f ] = x;
    expect(num).to.equal(1);
    expect(str).to.equal('ABC');
    expect(bool).to.equal(true);
    expect(f).to.equal(x);
  });
});
