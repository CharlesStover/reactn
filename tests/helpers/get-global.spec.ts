import { expect } from 'chai';
import { getGlobal, resetGlobal, setGlobal } from '../../index';

describe('getGlobal', () => {

  afterEach(resetGlobal);

  it('should return the global state', async () => {
    expect(getGlobal().value).not.to.equal(1);
    expect(getGlobal().value).to.equal(undefined);
    await setGlobal({
      value: 1
    });
    expect(getGlobal().value).not.to.equal(undefined);
    expect(getGlobal().value).to.equal(1);
  });

});
