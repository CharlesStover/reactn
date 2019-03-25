import * as sinon from 'sinon';
import GlobalStateManager from '../../global-state-manager';

export interface Spies {
  [key: string]: sinon.SinonSpy;
}

export default function spyOn(
  ...methods: (keyof GlobalStateManager)[]
): Spies {

  const spies: Spies = {};

  beforeEach((): void => {
    for (const method of methods) {
      spies[method] = sinon.spy(GlobalStateManager.prototype, method);
    }
  });

  afterEach((): void => {
    for (const method of methods) {
      spies[method].restore();
    }
  });

  return spies;
}
