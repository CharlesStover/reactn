interface MadeIterable {
  0: any;
  1: any;
  slice: typeof Array.prototype.slice;
  [Symbol.iterator]: () => Iterator<any>;
}

export default function makeIterable<F>(f: F, ...values: any[]): F & MadeIterable {
  const valuesLength = values.length;

  for (let i = 0; i < valuesLength; i++) {
    f[i] = values[i];
  }

  f['slice'] = values.slice.bind(values);

  // Mutate object by adding a Symbol.iterator property.
  f[Symbol.iterator] = function ReactNIterator(): Iterator<any> {
    let index = 0;
    return {
      next: function ReactNIteratorNext(): IteratorResult<any> {

        // Iterate.
        if (index < valuesLength) {
          return {
            done: false,
            value: values[index++],
          };
        }

        // Done.
        index = 0;
        return {
          done: true,
          value: undefined,
        };
      },
    };
  };

  return f as (F & MadeIterable);
}
