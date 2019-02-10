// Return an object that executes a read listener.

export default function objectGetListener(obj, listener) {
  return Object.keys(obj).reduce(
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
};
