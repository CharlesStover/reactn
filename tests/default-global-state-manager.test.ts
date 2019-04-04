import defaultGlobalStateManager from '../src/default-global-state-manager';
import GlobalStateManager from '../src/global-state-manager';



const EMPTY_OBJECT: {} = Object.create(null);



describe('Default GlobalStateManager', (): void => {

  it('should be a GlobalStateManager', (): void => {
    expect(defaultGlobalStateManager).toBeInstanceOf(GlobalStateManager);
  });

  it('should have an empty state', (): void => {
    expect(defaultGlobalStateManager.state).toStrictEqual(EMPTY_OBJECT);
  });

  it('should not have dispatchers', (): void => {
    expect(defaultGlobalStateManager.dispatchers).toStrictEqual(EMPTY_OBJECT);
  });
});
