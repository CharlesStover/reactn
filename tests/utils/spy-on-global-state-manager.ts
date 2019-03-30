import * as sinon from 'sinon';
import GlobalStateManager from '../../src/global-state-manager';

export interface Spies {
  [key: string]: sinon.SinonSpy;
}

export default function spyOn(
  ...methods: (keyof GlobalStateManager)[]
): Spies {

  const spies: Spies = {};

  beforeEach((): void => {
    for (const method of methods) {
      if (method === 'state') {
        const temp = sinon.spy(
          GlobalStateManager.prototype,
          method,
          [ 'get' ],
        );
        // @ts-ignore: Property 'get' does not exist on type
        //   'SinonSpy<any[], any>'.
        spies[method] = temp.get;
        spies[method].restore = temp.restore;
      }
      else {
        spies[method] = sinon.spy(GlobalStateManager.prototype, method);
      }
    }
  });

  afterEach((): void => {
    for (const method of methods) {
      spies[method].restore();
    }
  });

  return spies;
}
