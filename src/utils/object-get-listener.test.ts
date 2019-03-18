import { expect } from 'chai';
import objectGetListener from './object-get-listener';

interface Shape {
  [key: string]: number;
}

const sortEntriesByKey = (
  [ key1 ]: [ string, number ],
  [ key2 ]: [ string, number ]
): -1 | 0 | 1 =>
  key1 < key2 ?
    -1 :
    key1 > key2 ?
      1 :
      0;

describe('objectGetListener', () => {

  it('should return the same keys and values', () => {

    // Original object.
    const obj: Shape = {
      x: 1,
      y: 2,
      z: 3,
    };
    const entries = Object.entries(obj);
    entries.sort(sortEntriesByKey);

    // Subscribed object.
    const obj2 = objectGetListener(obj, () => { });
    const entries2 = Object.entries(obj2);
    entries2.sort(sortEntriesByKey);

    // Expect the shape to be the same.
    expect(entries).to.deep.equal(entries2);
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
