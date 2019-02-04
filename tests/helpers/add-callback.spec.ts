import { expect } from 'chai';
import { addCallback, getGlobal, resetGlobal, setGlobal } from '../../index';

describe('addCallback', () => {

  afterEach(resetGlobal);

  it('should add a callback');

  describe('the added callback', () => {

    it('should execute on state change', async () => {
      let executed = false;
      let state = null;
      const value = Object.create(null);
      addCallback(global => {
        executed = true;
        state = global.value;
      });
      expect(executed).not.to.equal(true);
      expect(executed).to.equal(false);
      await setGlobal({ value });
      expect(executed).not.to.equal(false);
      expect(executed).to.equal(true);
      expect(state).not.to.equal(null);
      expect(state).to.equal(value);
    });

    it('should update the state if it returns a new state', async () => {
      addCallback(global => {
        if (global.value === 1) {
          return { value: 2 };
        }
        return null;
      });
      expect(getGlobal().value).not.to.equal(1);
      expect(getGlobal().value).not.to.equal(2);
      expect(getGlobal().value).to.equal(undefined);
      await setGlobal({ value: 1 });
      expect(getGlobal().value).not.to.equal(1);
      expect(getGlobal().value).to.equal(2);
    });
  });

});
