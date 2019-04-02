import { cleanup } from 'react-testing-library';
import {
  addReducers,
  Component,
  PureComponent,
  setGlobal,
} from '../../build/index';
import { INITIAL_REDUCERS, INITIAL_STATE } from '../utils/initial';
import testMount from './mount';



type VoidFunction = () => void;



const testComponent = (_Super: typeof Component): VoidFunction => (): void => {

  beforeEach((): void => {
    addReducers(INITIAL_REDUCERS);
    setGlobal(INITIAL_STATE);
  });

  afterEach(cleanup);

  testMount(_Super);

  it.skip('should do more', (): void => {
  });
};



describe('Components', (): void => {
  describe('ReactNComponent', testComponent(Component));
  describe('ReactNPureComponent', testComponent(PureComponent));
});
