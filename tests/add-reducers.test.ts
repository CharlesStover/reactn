import { expect } from 'chai';
import GlobalStateManager from '../src/global-state-manager';
import addReducers from '../src/helpers/add-reducers';
import { GS, INITIAL_REDUCERS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const REDUCERS = Object.entries(INITIAL_REDUCERS);



describe('addReducers', (): void => {



  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('addDispatcher', 'removeDispatcher');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(addReducers).to.be.a('function');
    expect(addReducers.length).to.equal(2);
  });

  it(
    'should call GlobalStateManager.addDispatcher for each reducer',
    (): void => {
      addReducers(globalStateManager, INITIAL_REDUCERS);
      expect(spy.addDispatcher.callCount).to.equal(REDUCERS.length);
      for (const [ name, reducer ] of REDUCERS) {
        expect(spy.addDispatcher.calledWithExactly(name, reducer))
          .to.equal(true);
      }
    }
  );



  describe('returned remove reducers function', (): void => {

    let removeReducers: () => boolean;
    beforeEach((): void => {
      removeReducers = addReducers(globalStateManager, INITIAL_REDUCERS);
    });

    it('should be a function with no arguments', (): void => {
      expect(removeReducers).to.be.a('function');
      expect(removeReducers.length).to.equal(0);
    });

    it(
      'should call GlobalStateManager.removeDispatcher for each reducer',
      (): void => {
        removeReducers();
        expect(spy.removeDispatcher.callCount).to.equal(REDUCERS.length);
        for (const [ name, reducer ] of REDUCERS) {
          expect(spy.removeDispatcher.calledWithExactly(name))
            .to.equal(true);
        }
      }
    );
  });

});
