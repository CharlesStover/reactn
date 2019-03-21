import { expect } from 'chai';
import objectGetListener from './object-get-listener';

interface Shape {
  [key: string]: number;
}

describe('objectGetListener', () => {

  it('should return the same keys and values', () => {

    // Original object.
    const obj: Shape = {
      x: 1,
      y: 2,
      z: 3,
    };
    const keys1 = Object.keys(obj);
    keys1.sort();

    // Subscribed object.
    const obj2 = objectGetListener(obj, () => { });
    const keys2 = Object.keys(obj2);
    keys2.sort();

    // Expect the shape to be the same.
    const keysLength: number = keys1.length;
    expect(keysLength).to.equal(keys2.length);
    for (let i = 0; i < keysLength; i++) {
      expect(keys1[i]).to.deep.equal(keys2[i]);
    }
  });

  it('should subscribe to the object properties\' get', () => {

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
    expect(obj2.y).to.equal(2);

    // Expect only Y to be read.
    expect(read.has('x')).to.equal(false);
    expect(read.has('y')).to.equal(true);
    expect(read.has('z')).to.equal(false);
  });
});
