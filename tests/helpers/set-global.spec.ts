import { expect } from 'chai';
import { getGlobal, resetGlobal, setGlobal } from '../../index';

describe('setGlobal', () => {

  afterEach(resetGlobal);

  it('should set the global state', async () => {
    expect(getGlobal().loading).to.equal(undefined);
    await setGlobal({
      loading: true
    });
    expect(getGlobal().loading).to.equal(true);
  });

  it('should support a callback', () => new Promise(resolve => {
    expect(getGlobal().loading).to.equal(undefined);
    setGlobal(
      {
        loading: true
      },
      () => {
        expect(getGlobal().loading).to.equal(true);
        resolve();
      }
    );
  }));
});
