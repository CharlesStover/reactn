import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';



interface GS {
  x: boolean;
  y: number;
}



const INITIAL_STATE: GS = {
  x: false,
  y: 0,
};



export default (): void => {

  let globalStateManager: GlobalStateManager<GS, {}>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS, {}>(INITIAL_STATE);
  });

  it('should be a function', (): void => {
    expect(globalStateManager.flush).to.be.a('function');
  });

  it('should accept no parameters', (): void => {
    expect(globalStateManager.flush.length).to.equal(0);
  });

  it.skip('should do more');
};
