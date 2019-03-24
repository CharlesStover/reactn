import { expect } from 'chai';
import sinon from 'sinon';
import GlobalStateManager from '../global-state-manager';
import addReducer from './add-reducer';

const REDUCER = (_globalState, _one, _two, _three): void => { };
const REDUCER_NAME = 'reducerName';

const shouldCall = (method: string): string =>
  `should call GlobalStateManager.${method} with correct parameters`;

describe('addReducer', () => {



  let globalStateManager: GlobalStateManager<{}, {}>;
  let spy: sinon.SinonSpy;



  it('should be a function', () => {
    expect(addReducer).to.be.a('function');
  });

  it('should accept 3 parameters', () => {
    expect(addReducer.length).to.equal(3);
  });



  beforeEach(() => {
    globalStateManager = new GlobalStateManager<{}, {}>();
  });



  before(() => {
    spy = sinon.spy(GlobalStateManager.prototype, 'addReducer');
  });
  after(() => {
    spy.restore();
  });
  it(shouldCall('addReducer'), () => {
    addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    expect(spy.calledOnceWithExactly(REDUCER_NAME, REDUCER)).to.equal(true);
  });



  describe('returned remove reducer function', () => {

    let removeReducer: () => boolean;
    beforeEach(() => {
      removeReducer = addReducer(globalStateManager, REDUCER_NAME, REDUCER);
    });

    it('should be a function', () => {
      expect(removeReducer).to.be.a('function');
    });

    it('should not accept parameters', () => {
      expect(removeReducer.length).to.equal(0);
    });

    let spy: sinon.SinonSpy;
    before(() => {
      spy = sinon.spy(GlobalStateManager.prototype, 'removeReducer');
    });
    after(() => {
      spy.restore();
    });
    it(shouldCall('removeReducer'), () => {
      removeReducer();
      expect(spy.calledOnceWithExactly(REDUCER_NAME)).to.equal(true);
    });
  });

});
