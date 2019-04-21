import React, { addReducer, setGlobal, useGlobal } from 'reactn';

// Initialize the global state with the value 0.
setGlobal({ value: 0 });

// When the increment reducer is called, increment the global value by X.
addReducer('increment', (global, x = 1) => ({
  value: global.value + x
}));

export default function MyComponent() {
  const increment = useGlobal('increment');
  const [ value ] = useGlobal('value');
  return (
    <>
      The value is{' '}
      <button
        onClick={() => {

          // Increment from 0 to 1.
          // (the default value of the reducer is 1)
          if (value === 0) {
            increment();
          }

          // Increment from 1 to 5.
          else if (value === 1) {
            increment(4);
          }
        }}
        value={value}
      />
    </>
  );
}
