import { expect } from 'chai';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });

  it('should be a function', (): void => {
    expect(Provider.reset).to.be.a('function');
  });

  it('should accept no parameters', (): void => {
    expect(Provider.reset.length).to.equal(0);
  });

  it.skip('should do more', (): void => {
  });
};

/*
const resetTest = (method: 'reset' | 'resetGlobal'): VoidFunction =>
(): void => {

  const spy = spyOn('reset');

  it('should exist', (): void => {
    expect(Provider[method]).to.be.a('function');
    expect(Provider[method].length).to.equal(0);
  });

  it('should call GlobalStateManager reset', (): void => {
    expect(spy.reset.calledOnceWithExactly()).to.equal(false);
    Provider[method]();
    expect(spy.reset.calledOnceWithExactly()).to.equal(true);
  });

  it('should return undefined', (): void => {
    expect(Provider[method]()).to.be.undefined;
  });

  it('should reset the state', (): void => {
    Provider.setGlobal(updatedState);
    expect(Provider.global.x).to.equal(UPDATED_X);
    expect(Provider.global.y).to.equal(UPDATED_Y);
    expect(Provider.global.z).to.equal(UPDATED_Z);
    Provider.reset();
    expect(Provider.global.x).to.equal(INITIAL_X);
    expect(Provider.global.y).to.equal(INITIAL_Y);
    expect(Provider.global.z).to.equal(INITIAL_Z);
  });
};

describe('reset', resetTest('reset'));
describe('resetGlobal', resetTest('resetGlobal'));

*/
