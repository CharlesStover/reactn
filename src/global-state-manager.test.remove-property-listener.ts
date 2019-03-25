import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

export default (): void => {

  let globalStateManager: GlobalStateManager<{}, {}>;
  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });

  it('should be a function', () => {
    expect(globalStateManager.beginTransaction).to.be.a('function');
  });

  it('should accept no parameters', () => {
    expect(globalStateManager.beginTransaction.length).to.equal(0);
  });

  it('should return a number', () => {
    const id: number = globalStateManager.beginTransaction();
    expect(id).to.be.a('number');
  });

  it('should return a different number each call', () => {
    const ids: number[] = [
      globalStateManager.beginTransaction(),
      globalStateManager.beginTransaction(),
      globalStateManager.beginTransaction(),
    ];
    expect(ids.length).to.equal(new Set(ids).size);
  });
};
