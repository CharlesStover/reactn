import GlobalStateManager from '../../src/global-state-manager';

export interface Spies {
  [key: string]: jest.SpyInstance;
}

export default function spyOn(
  ...methods: (keyof GlobalStateManager)[]
): Spies {

  const spies: Spies = {};

  beforeEach((): void => {
    for (const method of methods) {
      if (
        method === 'dispatchers' ||
        method === 'propertyListeners' ||
        method === 'queue' ||
        method === 'state'
      ) {
        spies[method] = jest.spyOn(
          GlobalStateManager.prototype,
          method,
          'get',
        );
      }
      else {
        spies[method] = jest.spyOn(GlobalStateManager.prototype, method);
      }
    }
  });

  afterEach((): void => {
    for (const method of methods) {
      spies[method].mockRestore();
    }
  });

  return spies;
}
