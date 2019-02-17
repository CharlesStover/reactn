import { resetGlobal } from '../../index';
import testGetter from '../utils/helpers/with-global/getter';
import testSetter from '../utils/helpers/with-global/setter';

describe('withGlobal', () => {

  afterEach(resetGlobal);

  describe('Provider', () => {
    testGetter(true);
    testSetter(true);
  });

  testGetter(false);
  testSetter(false);

});
