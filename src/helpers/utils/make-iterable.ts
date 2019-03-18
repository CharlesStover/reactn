export default function makeIterable(f, ...values) {
  const valuesLength = values.length;

  for (let i = 0; i < valuesLength; i++) {
    f[i] = values[i];
  }

  f['slice'] = values.slice.bind(values);

  // Mutate object by adding a Symbol.iterator property.
  f[Symbol.iterator] = function ReactNIterator() {
    let index = 0;
    return {
      next: function ReactNIteratorNext() {

        // Iterate.
        if (index < valuesLength) {
          return {
            done: false,
            value: values[index++],
          };
        }

        // Done.
        index = 0;
        return { done: true };
      },
    };
  };

  return f;
}
