import {
  Component as BuildComponent,
  PureComponent as BuildPureComponent
} from '../index';
import {
  ReactNComponent as SourceComponent,
  ReactNPureComponent as SourcePureComponent
} from '../src/components';
import shouldHaveGlobalProperties from './utils/should-have-global-properties';

describe('ReactN Components', () => {
  describe(
    'Component (Build)',
    shouldHaveGlobalProperties(BuildComponent)
  );
  describe(
    'Component (Source)',
    shouldHaveGlobalProperties(SourceComponent)
  );
  describe(
    'PureComponent (Build)',
    shouldHaveGlobalProperties(BuildPureComponent)
  );
  describe(
    'PureComponent (Source)',
    shouldHaveGlobalProperties(SourcePureComponent)
  );
});
