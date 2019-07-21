import React from 'reactn';

export default function AddReducer(): JSX.Element {
  return (
    <>
      <p>Use <code>addReducer</code> to add a reducer to your global state.</p>
      <p>
        The first parameter is the name of your reducer. You will access your
        reducer by this name: <code>this.global.reducerName</code> or
        <code>useGlobalReducer('reducerName')</code>.
      </p>
      <p>
        The second parameter is the reducer function. The reducer function that
        you write has two parameters: first, the global state; second, the
        value passed to the reducer. The reducer function that you use has one
        parameter: the value to pass to the reducer.
      </p>
      EXAMPLE1
      <p>
        For a class component, the analogous method is{' '}
        <code>this.global.increment(value)</code>.
      </p>
    </>
  );
}
