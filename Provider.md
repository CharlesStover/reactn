# Provider

ReactN's global components attempt to receive the global state from a React
Context. If the ReactN Context cannot be found, then the global components will
fallback to a default global state.

You may want two instances of your application to use two different global
states, such as if you are concurrently server-side rendering your application
for two different users at the same time. In this case, sharing the default
global state with both users may create incorrect views or leak private data.
By surrounding each application instance in a ReactN Context, the global state
of each application's ReactN Components will be encapsulated within that
Context.

This may also be useful if you want to encapsulate multiple global states in a
single application.

## Table of Contents

* [Getting Started](#getting-started)
* [Helper Functions](#helper-functions)
* [useGlobal and withGlobal](#useglobal-and-withglobal)

## Getting Started

To create an encapsulating ReactN Context, import the `createProvider` helper
function. Since the global state is automatically consumed by the ReactN
Components, you do not need a Consumer Component.

The `createProvider` function takes an initial state as a parameter.

```JavaScript
import React, { createProvider } from 'reactn';
import ReactDOM from 'react-dom';
import App from './App';

const INITIAL_STATE = {
  loading: false,
  users: [ ],
};

const Provider = createProvider(INITIAL_STATE);

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## Helper Functions

[Helper functions](https://github.com/CharlesStover/reactn/blob/master/README.md#helper-functions),
when imported directly from `reactn`, affect the default global state, as they
execute outside of the bounds of React Context. As a result, they will not
affect ReactN Components that are using a ReactN Context and they will affect
all ReactN Components outside of a ReactN Context.

You may access these
[helper functions](https://github.com/CharlesStover/reactn/blob/master/README.md#helper-functions)
within your ReactN Context as static methods on your `Provider` Component.

These static methods behave exactly as the
[helper functions](https://github.com/CharlesStover/reactn/blob/master/README.md#helper-functions)
outside of a ReactN Context, so their documentation in the README will be more
comprehensive than here.

```JavaScript
import { createProvider } from 'reactn';
const Provider = createProvider({});

Provider.addCallback(callbackFunction);

Provider.addReducer('name', reducerFunction);

Provider.getGlobal();

Provider.removeCallback(callbackFunction);

Provider.resetGlobal();

Provider.setGlobal({ x: 1 });
```

## useGlobal and withGlobal

The `useGlobal` React Hook and `withGlobal` Higher-Order Component, unlike
other helper methods, have access to the ReactN Context. Because of this, you
do not need to use your `Provider`'s static method.

However, you may want to mix-and-match multiple global states in a single
component. Because of this, you can forcefully override the Context with your
`Provider`'s static method.

`Provider.useGlobal` and `Provider.withGlobal` behave exactly like their
respective helper functions, except they ignore the existing ReactN Context and
use your `Provider` instead.

Below is an example component that uses four different global states at once.

```JavaScript
import React, { createProvider, useGlobal, withGlobal } from 'reactn';

const Provider1 = createProvider({ x: 1 });
const Provider2 = createProvider({ x: 2 });
const Provider3 = createProvider({ x: 3 });
const Provider4 = createProvider({ x: 4 });

function MyComponent({ x4 }) {

  // The Context is Provider1 wrapping this Component.
  const [ x1 ] = useGlobal('x');

  // Ignore Provider1 and get Provider2's value.
  const [ x2 ] = Provider2.useGlobal('x');

  // Use any number of global states in your Components.
  const [ x3 ] = Provider3.useGlobal('x');

  // Display 1, 2, 3, 4.
  return (
    <div>
      Provider1's value for x: {x1} (useGlobal)<br />
      Provider2's value for x: {x2} (Provider2.useGlobal)<br />
      Provider3's value for x: {x3} (Provider3.useGlobal)<br />
      Provider4's value for x: {x4} (Provider4.withGlobal)
    </div>
  );
}

// Ignore Provider1 and map Provider4's global state to props.
const MyComponentWithGlobal = Provider4.withGlobal(
  ({ x }) => ({ x4: x })
);

ReactDOM.render(
  <Provider1>
    <MyComponentWithGlobal />
  </Provider1>
);
```
