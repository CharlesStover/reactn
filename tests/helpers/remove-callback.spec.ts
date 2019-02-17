import { expect } from 'chai';
import {
  addCallback, removeCallback, resetGlobal, setGlobal
} from '../../index';

describe('removeCallback', () => {

  afterEach(resetGlobal);

  it('should remove a callback');

  describe('the removed callback', () => {

    it('should not execute on state change', async () => {

      let called = 0;
      const callback = () => {
        called++;
      };

      expect(called).to.equal(0);
      const remove = addCallback(callback);
      expect(called).to.equal(0);
      await setGlobal({ value: 1 });
      expect(called).to.equal(1);
      await setGlobal({ value: 1 });
      expect(called).to.equal(2);
      remove();
      expect(called).to.equal(2);
      addCallback(callback);
      await setGlobal({ value: 1 });
      expect(called).to.equal(3);
      removeCallback(callback);
      expect(called).to.equal(3);
    });

  });

});
 