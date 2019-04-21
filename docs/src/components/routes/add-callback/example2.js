import { addCallback, setGlobal } from 'reactn';

const removeAlert = addCallback(global => {
  alert(global.value);
});

// The callback causes an alert on global state change:
setGlobal({ value: 1 }); // 1
setGlobal({ value: 2 }); // 2

// No longer execute the callback.
removeAlert();

// No alerts:
setGlobal({ value: 3 });
setGlobal({ value: 4 });
