import { expect } from 'chai';
import makeIterable from '../src/helpers/utils/make-iterable';

describe('makeIterable', (): void => {

  it('should make a function destructurable', (): void => {
    function x(): void { }
    makeIterable(x, 1, 'ABC', true, x);
    // @ts-ignore: () => { } is not an array
    const [ num, str, bool, f ] = x;
    expect(num).to.equal(1);
    expect(str).to.equal('ABC');
    expect(bool).to.equal(true);
    expect(f).to.equal(x);
  });

  it('should make a function iterable', (): void => {
    function x(): void { }
    const items = [ 1, 'ABC', true, x ];
    const y = makeIterable.apply(null, [ x, ...items ]);
    let key = 0;
    for (const item of y) {
      expect(item).to.equal(items[key]);
      key++;
    }
  });
});
