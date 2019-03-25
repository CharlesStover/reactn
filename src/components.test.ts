import {
  ReactNComponent,
  ReactNComponentClass,
  ReactNPureComponent,
  ReactNPureComponentClass,
} from './components';



type VoidFunction = () => void;



const testComponent = (
  _Super: ReactNComponentClass | ReactNPureComponentClass,
): VoidFunction =>
  (): void => {
    it.skip('should do something');
  };



describe('Components', (): void => {
  describe('ReactNComponent', testComponent(ReactNComponent));
  describe('ReactNPureComponent', testComponent(ReactNPureComponent));
});
