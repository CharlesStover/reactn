import { Component } from 'react';
import shouldHaveGlobalProperties from './utils/should-have-global-properties';
import buildDecorator from '../index';
import sourceDecorator from '../src/decorator';

@buildDecorator
class BuildDecoratedComponent extends Component<{}, {}> {
}

@sourceDecorator
class SourceDecoratedComponent extends Component<{}, {}> {
}

describe('@reactn Decorator', () => {

  describe(
    'Build',

    // @ts-ignore
    shouldHaveGlobalProperties(BuildDecoratedComponent)
  );

  describe(
    'Source',

    // @ts-ignore
    shouldHaveGlobalProperties(SourceDecoratedComponent)
  );

});
