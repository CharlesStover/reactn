import { expect } from 'chai';
import createProvider, { ReactNProvider } from '../../src/create-provider';
import { GS, INITIAL_STATE } from '../utils/initial';
import spyOn from '../utils/spy-on-global-state-manager';



describe('Provider.global', (): void => {

  let Provider: ReactNProvider<GS>;
  const spy = spyOn('state');
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE);
  });



  it('should be an object', (): void => {
    expect(Provider.global).to.be.an('object');
  });

  it('should not have a setter', (): void => {
    expect((): void => {
      // @ts-ignore: Deliberately throwing an error.
      Provider.global = true;
    }).to.throw();
  });

  it('should call GlobalStateManager.state', (): void => {
    Provider.global;
    expect(spy.state.calledOnceWithExactly()).to.equal(true);
  });

  it('should return a copy of the state', (): void => {
    const state: GS = Provider.global;
    expect(state).to.deep.equal(INITIAL_STATE);
    expect(state).not.to.equal(INITIAL_STATE);
  });

  it('should update when the state updates', async (): Promise<void> => {
    const STRING = 'create-provider.test.global';

    expect(Provider.global.z).not.to.equal(STRING);
    await Provider.setGlobal({
      z: STRING,
    });
    expect(Provider.global.z).to.equal(STRING);
  });
});
