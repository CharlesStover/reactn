import { expect } from 'chai';
const { getGlobal, resetGlobal, setGlobal } = require('../../index');

const empty = Object.create(null);

describe('resetGlobal', () => {

  it('should reset the global state', async () => {
    expect(getGlobal()).to.deep.equal(empty);
    await setGlobal({
      value: 1
    });
    expect(getGlobal()).not.to.deep.equal(empty);
    expect(getGlobal()).to.deep.equal({
      value: 1
    });
    await resetGlobal();
    expect(getGlobal()).not.to.deep.equal({
      value: 1
    });
    expect(getGlobal()).to.deep.equal(empty);
  });

});
