// Return an object that executes a read listener.

export default function objectGetListener<Shape>(
  obj: Shape,
  listener: Function,
): Shape {
  return (Object.keys(obj) as (keyof Shape)[]).reduce(
    (accumulator: Partial<Shape>, key: keyof Shape): Partial<Shape> => {
      Object.defineProperty(accumulator, key, {
        configurable: false,
        enumerable: true,
        get: (): Shape[keyof Shape] => {
          listener(key);
          return obj[key];
        }
      });
      return accumulator;
    },
    Object.create(null)
  );
};
