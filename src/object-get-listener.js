// Return an object that executes a read listener.

const objectGetListener = (obj, listener) =>
  Object.keys(obj).reduce(
    (accumulator, key) => {
      Object.defineProperty(accumulator, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          listener(key);
          return obj[key];
        }
      });
      return accumulator;
    },
    Object.create(null)
  );

module.exports = objectGetListener;
