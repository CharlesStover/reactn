import {
  ReactNComponent,
  ReactNComponentClass,
  ReactNPureComponent,
} from './components';

describe('Components', () => {

  const testComponent = (_Super: ReactNComponentClass) => (): void => {
    it.skip('should do something');
  };

  describe('ReactNComponent', testComponent(ReactNComponent));
  describe('ReactNPureComponent', testComponent(ReactNPureComponent));
});
