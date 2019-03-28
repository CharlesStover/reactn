import {
  addReducers,
  Component,
  PureComponent,
  setGlobal,
} from '../../build/index';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import testMount from './mount';



type VoidFunction = () => void;



const testComponent = (
  _Super: typeof Component,
): VoidFunction =>
  (): void => {

    class TestComponent extends _Super<{}, {}, GS, R> {
    }

    beforeEach((): void => {
      addReducers(INITIAL_REDUCERS);
      setGlobal(INITIAL_STATE);
    });

    it('should mount without error', testMount(TestComponent));

    it('should do more');
  };



describe.only('Components', (): void => {
  describe('ReactNComponent', testComponent(Component));
  describe('ReactNPureComponent', testComponent(PureComponent));
});
