import React from 'reactn';

export default function AddCallback() {
  return (
    <>
      <p>
        Use <code>addCallback</code> to execute a function whenever the state
        changes. The return value of the callback will update the global state,
        so be sure to only return <code>undefined</code> or{' '}
        <code>null</code> if you do not want the global state to change. Be
        aware that always returning a new state value will result in an
        infinite loop, as the new global state will trigger the very same
        callback.
      </p>
      <p>The only parameter is the callback function.</p>
      EXAMPLE1
      <p>
        The return value of <code>addCallback</code> is a function that, when
        executed, removes the callback.
      </p>
      EXAMPLE2
    </>
  );
}
