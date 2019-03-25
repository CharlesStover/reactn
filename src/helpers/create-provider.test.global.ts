import { expect } from 'chai';
import { GS, INITIAL_STATE } from '../utils/test/initial';
import createProvider, { ReactNProvider } from './create-provider';

export default (): void => {

  let Provider: ReactNProvider<GS>;
  beforeEach(() => {
    Provider = createProvider(INITIAL_STATE);
  });

  it('should be an object', () => {
    expect(Provider.global).to.be.an('object');
  });

  it('should not have a setter', () => {
    expect(() => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.global = true;
    }).to.throw();
  });

  it('should match the state', () => {
    expect(Provider.global).to.deep.equal(INITIAL_STATE);
  });

  it('should update when the state updates', async () => {
    const STRING = 'create-provider.test.global';

    expect(Provider.global.z).not.to.equal(STRING);
    await Provider.setGlobal({
      z: STRING,
    });
    expect(Provider.global.z).to.equal(STRING);
  });
};
