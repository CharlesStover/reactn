import { addCallback, setGlobal } from 'reactn';

// Every time the global state changes, this function will execute.
addCallback(global => {
  alert(`The new value is ${global.value}!`);

  // If the global state was changed to 1, change it to 2.
  if (global.value === 1) {
    return { value: 2 };
  }

  // If the global state is anything other than 1, don't change it.
  return null;
});

setGlobal({ value: 1 });
// The new value is 1!
// The new value is 2!
