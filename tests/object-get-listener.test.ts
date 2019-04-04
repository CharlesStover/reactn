import objectGetListener from '../src/utils/object-get-listener';

interface Shape {
  [key: string]: number;
}

describe('objectGetListener', (): void => {

  it('should return the same keys and values', (): void => {

    // Original object.
    const obj1: Shape = {
      x: 1,
      y: 2,
      z: 3,
    };

    // Subscribed object.
    const obj2 = objectGetListener(obj1, (): void => { });

    // Expect the shape to be the same.
    expect(obj1).toEqual(obj2);
  });

  it('should subscribe to the object properties\' get', (): void => {

    // Listener records which properties were read.
    const read = new Set();
    const listener = (key: string): void => {
      read.add(key);
    };

    // Create the objects.
    const obj: Shape = {
      x: 1,
      y: 2,
      z: 3,
    };
    const obj2 = objectGetListener(obj, listener);
    expect(obj2.y).toBe(2);

    // Expect only Y to be read.
    expect(read.has('x')).toBe(false);
    expect(read.has('y')).toBe(true);
    expect(read.has('z')).toBe(false);
  });
});
