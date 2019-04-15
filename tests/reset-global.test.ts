import GlobalStateManager from '../src/global-state-manager';
import resetGlobal from '../src/reset-global';
import spyOn from './utils/spy-on-global-state-manager';

describe('resetGlobal', (): void => {

  let globalStateManager: GlobalStateManager;
  const spy = spyOn('reset');
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager();
  });



  it('should be a function with 1 argument', (): void => {
    expect(resetGlobal).toBeInstanceOf(Function);
    expect(resetGlobal).toHaveLength(1);
  });

  it('should call GlobalStateManager.reset', (): void => {
    resetGlobal(globalStateManager);
    expect(spy.reset).toHaveBeenCalledTimes(1);
    expect(spy.reset).toHaveBeenCalledWith();
  });

  it('should return undefined', (): void => {
    expect(resetGlobal(globalStateManager)).toBeUndefined();
  });
});
