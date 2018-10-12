import reducers from './reducers';

const listeners = new Map();

// Map component instance to a state property.
const addListener = (key, instance) => {
  if (!listeners.has(key)) {
    listeners.set(key, new Set([ instance ]));
  }
  else {
    listeners.get(key).add(instance);
  }
};

// Force update a set of component instances.
const enqueueForceUpdate = instances => {
  if (
    instances &&
    instances.size
  ) {
    if (instances) {
      for (const instance of instances) {
        instance.updater.enqueueForceUpdate(instance, null, 'forceUpdate');
      }
    }
  }
};

// Unmap a component instance from all state properties.
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
            newState
              .then(newStateResolved => {
                this.set(
                  typeof newStateResolved === 'function' ?
                    newStateResolved(this._state) :
                    newStateResolved
                );
              })
              .catch(() => {});
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

  set(key, value, forceUpdate = true) {

    // No changes, e.g. getDerivedGlobalFromProps.
    if (key === null) {
      return;
    }

    // Multi-key changes.
    if (typeof key === 'object') {
      const instances = new Set();
      for (const [ k, v ] of Object.entries(key)) {
        this.set(k, v, false);
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
    if (forceUpdate) {
      enqueueForceUpdate(listeners.get(key));
    }
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
