// Return an object that executes a read listener.

export default function objectGetListener<Shape>(
  obj: Shape,
  listener: Function,
): Shape {
  return Object.keys(obj).reduce(
    (accumulator: Partial<Shape>, key: string): Partial<Shape> => {
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
