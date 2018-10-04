import reducers from './reducers';

const listeners = new Map();

const addListener = (key, instance) => {
  if (!listeners.has(key)) {
    listeners.set(key, new Set());
  }
  listeners.get(key).add(instance);
};

const enqueueForceUpdate = instances => {
  if (instances) {
    for (const instance of instances) {
      instance.updater.enqueueForceUpdate(instance, null, 'forceUpdate');
    }
  }
};

export const removeListeners = instance => {
  for (const [ , instances ] of listeners.entries()) {
    if (instances.has(instance)) {
      instances.delete(instance);
    }
  }
};

class GlobalStateManager {

  _state = Object.create(null);

  get reducers() {
    return Object.entries(reducers).reduce(
      (accumulator, [ key, reducer ]) => {

        // Don't bind init() to components.
        if (key === 'init') {
          return accumulator;
        }
        accumulator[key] = (...args) => {
          const newState = reducer(this._state, ...args);
          if (newState instanceof Promise) {
            newState.then(newStateResolved => {
              this.set(newStateResolved);
            });
          }
          else {
            this.set(newState);
          }
        };
        return accumulator;
      },
      Object.create(null)
    );
  }

  set(key, value) {

    // No changes, e.g. getDerivedGlobalFromProps.
    if (key === null) {
      return;
    }

    // Multi-key changes.
    if (typeof key === 'object') {
      const instances = new Set();
      for (const [ k, v ] of Object.entries(key)) {
        this.set(k, v);
        const keyInstances = listeners.get(k);
        if (keyInstances) {
          for (const keyInstance of keyInstances) {
            instances.add(keyInstance);
          }
        }
      }
      enqueueForceUpdate(instances);
      return;
    }

    // Single-key changes.
    this._state[key] = value;
    enqueueForceUpdate(listeners.get(key));
  }

  state(instance) {
    return Object.assign(
      Object.keys(this._state).reduce(
        (accumulator, key) => {
          Object.defineProperty(accumulator, key, {
            configurable: false,
            enumerable: true,
            get: () => {
              addListener(key, instance);
              return this._state[key];
            }
          })
          return accumulator;
        },
        Object.create(null)
      ),
      this.reducers
    );
  }
};

export default new GlobalStateManager();
