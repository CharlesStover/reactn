import {
  addReducers,
  Component,
  PureComponent,
  setGlobal,
} from '../../build/index';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import testMount from './mount';



interface TestProps {
  x: boolean;
  y: number;
}

type VoidFunction = () => void;



const testComponent = (_Super: typeof Component): VoidFunction =>
  (): void => {

    class TestComponent extends _Super<TestProps, {}, GS, R> {

      componentDidMount() {
        this.dispatch.append('ab', 'cd');
      }

      componentDidUpdate(prevProps: TestProps, nextProps: TestProps) {
        this.dispatch.increment(nextProps.y);
      }

      componentWillUnmount() {
        this.dispatch.toggle();
      }

      handleClick = () => {
        this.setGlobal({
          x: false,
          y: 0,
          z: 'string',
        });
      };

      render() {
        return this.global.x;
      }
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
  describe(
    'ReactNPureComponent',
    testComponent(PureComponent as any as typeof Component),
  );
});
