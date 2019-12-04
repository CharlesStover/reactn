# ReactN [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=ReactN%20offers%20global%20state%20management%20baked%20into%20React!&url=https://github.com/CharlesStover/reactn&via=CharlesStover&hashtags=react,reactjs,javascript,typescript,webdev,webdevelopment) [![version](https://img.shields.io/npm/v/reactn.svg)](https://www.npmjs.com/package/reactn) [![minzipped size](https://img.shields.io/bundlephobia/minzip/reactn.svg)](https://www.npmjs.com/package/reactn) [![downloads](https://img.shields.io/npm/dt/reactn.svg)](https://www.npmjs.com/package/reactn) [![build](https://api.travis-ci.com/CharlesStover/reactn.svg)](https://travis-ci.com/CharlesStover/reactn/) [![chat](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/Tae4vuX)

ReactN is a extension of React that includes global state management. It treats
global state as if it were built into React itself -- without the boilerplate
of third party libraries.

[![banner](https://user-images.githubusercontent.com/343837/53267742-fe3f4900-3698-11e9-82fd-3c3a1decb7fd.png)](https://www.npmjs.com/package/reactn)

For support, reach out to us on the
[Reactiflux Discord channel #reactn](https://discord.gg/Tae4vuX).

💗 this project?
[Become a sponsor.](https://github.com/sponsors/CharlesStover)

## Install

- `npm install reactn` or
- `yarn add reactn`

## Features

### No boilerplate

For function components, `import { useGlobal } from 'reactn';` to harness the
power of React Hooks!

For class components, simply change `import React from 'react';` to
`import React from 'reactn';`, and your React class components will have global
state built in!

If you prefer class decorators, you can continue to
`import React from 'react';` for your components and additionally
`import reactn from 'reactn';` for access to the `@reactn` decorator!

### Intuitive

#### Function components

Global state in function components behaves almost identically to local state.

You use `[ global, setGlobal ] = useGlobal()` to access the entire global state
object.

You use `[ value, setValue ] = useGlobal(property)` where `property` is the
property of the global state you want to get and set.

Global reducers in function components behaves almost identically to local
reducers.

You use `dispatch = useDispatch(reducerFunction)` to mimic the behavior of
`useReducer`, where instead of providing an initial state, the state of the
reducer is the ReactN global state object.

You use `dispatch = useDispatch(reducerName)` to use a reducer that was added
by the `addReducer` helper function.

You use `dispatch = useDispatch(reducerFunction, property)` or
`[ value, dispatch ] = useDispatch(reducerFunction, property)` to apply a
reducer specifically to a global state property. This is very similar to
React's native `useReducer` functionality.

#### Class components

Global state in class components behaves exactly like local state!

You use `this.global` and `this.setGlobal` to get and set the global state.

You use `this.dispatch.reducerName()` to dispatch to a reducer that was added
by the `addReducer` helper function.

The `@reactn` decorator allows you to convert classes that extend
`React.Component` to ReactN global state components.

#### Map state to props

If you prefer Redux's `connect` functionality, pure functions, or are dealing
with deeply nested objects, a
[`withGlobal` higher-order component](#withglobal) is also available.

## Table of contents

- [Install](#install)
- [Features](#features)
  - [No boilerplate](#no-boilerplate)
  - [Intuitive](#intuitive)
- [Getting started](#getting-started)
  - [Managing multiple states](#managing-multiple-states)
  - [Initializing your state](#initializing-your-state)
  - [TypeScript support](#typescript-support)
  - [Developer tools](#developer-tools)
  - [Examples](#examples)
    - [Class components](#class-components)
    - [Class components (with decorator)](#class-components-with-decorator)
    - [Function components](#function-components-1)
    - [Helper functions](#helper-functions)
      - [addCallback](#addcallback)
      - [addReducer](#addreducer)
      - [getDispatch](#getdispatch)
      - [getGlobal](#getglobal)
      - [removeCallback](#removecallback)
      - [resetGlobal](#resetglobal)
      - [setGlobal](#setglobal)
      - [useDispatch](#usedispatch)
      - [useGlobal](#useglobal)
      - [withGlobal](#withglobal)
      - [withInit](#withinit)
- [Known issues](#known-issues)
- [Terminology](#terminology)
- [Frequently asked questions](https://github.com/CharlesStover/reactn/blob/master/FAQ.md)
- [Support](#support)

## Getting started

### Managing multiple states

**This README is for managing a single global state.** This is ideal for most
applications. If you are using concurrent server-side rendering or otherwise
want to work with multiple global states, follow the README for the
[Provider](https://github.com/CharlesStover/reactn/blob/master/Provider.md)
component, which allows you to limit a ReactN state to a React Context.

If you are unsure whether or not you need multiple global states, then you do
not need multiple global states.

### Initializing your state

You can initialize your global state using the `setGlobal` helper function. In
most cases, you do not want to initialize your global state in a component
lifecycle method, as the global state should exist before your components
attempt to render.

It is recommended that you initialize the global state just prior to mounting
with `ReactDOM`.

```javascript
import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import App from './App';

// Set an initial global state directly:
setGlobal({
  cards: [],
  disabled: false,
  initial: 'values',
  x: 1,
});

ReactDOM.render(<App />, document.getElementById('root'));
```

### TypeScript support

ReactN supports TypeScript out of the box! It is written entirely in TypeScript.
This gives it powerful intellisense, auto-complete, and error-catching abilities.

TypeScript can maintain inferred global state and reducer shape of a
[Providers](https://github.com/CharlesStover/reactn/blob/master/Provider.md).
Unfortunately, without your help, it cannot track the shape of the "default"
global state -- the one manipulated by the `setGlobal` and `addReducer` helper
functions.

In order to tell TypeScript the shape of your global state when you are not using
a Provider, create a file at `src/global.d.ts` with the following contents:

```javascript
import 'reactn';

declare module 'reactn/default' {

  export interface Reducers {

    append: (
      global: State,
      dispatch: Dispatch,
      ...strings: any[]
    ) => Pick<State, 'value'>;

    increment: (
      global: State,
      dispatch: Dispatch,
      i: number,
    ) => Pick<State, 'count'>;

    doNothing: (
      global: State,
      dispatch: Dispatch,
    ) => null;
  }

  export interface State {
    count: number;
    value: string;
  }
}
```

In the above file, we extend the `Reducers` and `State` interfaces in the
`'reactn/default'` file. While you will never use `'reactn/default'` in
your code, ReactN will use it to determine the shape of the default
global state.

The above example will add `append`, `increment`, and `doNothing` to your
`useDispatch` and `this.dispatch` auto-completion and typing. The parameters
and return values will also be correctly typed. In addition, it will also
add `count` and `value` to your `useGlobal` and `this.global` auto-competion
with the appropriate types as well.

### Developer tools

ReactN is compatible with the
[Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension#installation).

- Install the Redux DevTools extension to your browser or environment.
- Install the `redux` package to your project via `npm` or `yarn`. This is used
  to create a middleware Redux store for the Redux DevTools extension.
  - You do _not_ have to import or use the `redux` package anywhere in your
    project.
  - You do _not_ need to create a Redux store, reducer, or actions.
  - `redux` is just a peer dependency. It will be managed automatically.
- Follow the instructions on the
  [ReactN DevTools README](https://github.com/CharlesStover/reactn-devtools#readme).

### Examples

#### Class components

By importing React from `reactn` instead of `react`, you bake global state
directly into the React namespace. As a result, `Component` and `PureComponent`
will have access to the `global` and `dispatch` member variables and
`setGlobal` method.

```javascript
import React from 'reactn'; // <-- reactn
import Card from '../card/card';

// Render all cards in the global state.
export default class Cards extends React.PureComponent {
  componentDidMount() {
    // Hydrate the global state with the response from /api/cards.
    this.setGlobal(
      // Despite fetch returning a Promise, ReactN can handle it.
      fetch('/api/cards')
        .then(response => response.json())

        // Set the global `cards` property to the response.
        .then(cards => ({ cards }))

        // Fail gracefully, set the global `error`
        //   property to the caught error.
        .catch(err => ({ error: err })),
    );
  }

  render() {
    // For each card in the global state, render a Card component.
    // this.global returns the global state,
    //   much the same way this.state returns the local state.
    return (
      <div>
        {this.global.cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    );
  }
}
```

#### Class components (with decorator)

By importing React and ReactN separately, the React namespace remains
unchanged. You can inject ReactN's global functionality into your vanilla React
component by using the `@reactn` decorator imported from the `reactn` package.

```javascript
import React from 'react';
import reactn from 'reactn'; // <-- reactn
import Card from '../card/card';

// Render all cards in the global state.
@reactn
export default class Cards extends React.PureComponent {
  componentDidMount() {
    // Hydrate the global state with the response from /api/cards.
    this.setGlobal(
      // Despite fetch returning a Promise, ReactN can handle it.
      fetch('/api/cards')
        .then(response => response.json())

        // Set the global `cards` property to the response.
        .then(cards => ({ cards }))

        // Fail gracefully, set the global `error`
        //   property to the caught error.
        .catch(err => ({ error: err })),
    );
  }

  render() {
    // For each card in the global state, render a Card component.
    // this.global returns the global state,
    //   much the same way this.state returns the local state.
    return (
      <div>
        {this.global.cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    );
  }
}
```

#### Function components

Using [React Hooks](https://reactjs.org/docs/hooks-intro.html), you can harness
`useGlobal` to access the global state.

```javascript
import React, { useGlobal } from 'reactn'; // <-- reactn
import Card from '../card/card';

// Render all cards in the global state.
const Cards = () => {
  // Use the hook to get all cards in the global state.
  //   setCards is not used in this example.
  const [cards, setCards] = useGlobal('cards');

  // For each card in the global state, render a Card component.
  return (
    <div>
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Cards;
```

You may also use the `useDispatch` hook analogously to the `useReducer` hook by
providing a function to `useDispatch`.

```javascript
import React, { useDispatch } from 'reactn'; // <-- reactn

const incrementReducer = (global, dispatch, action) => ({
  count: global.count + action.amount,
});

const decrementReducer = (global, dispatch, action) => ({
  count: global.count - action.amount,
});

const MyComponent = () => {
  const increment = useDispatch(incrementReducer);
  const decrement = useDispatch(decrementReducer);

  return (
    <div>
      <button onClick={() => increment({ amount: 1 })}>Add 1</button>
      <button onClick={() => increment({ amount: 3 })}>Add 3</button>
      <button onClick={() => decrement({ amount: 5 })}>Subtract 5</button>
    </div>
  );
};

export default MyComponent;
```

By providing a second parameter to `useDispatch` that is the key of the global
state, the return value of that reducer will set that property of the global
state. This allows you to write your reducers similar to React's `useReducer`.

```javascript
import React, { useDispatch } from 'reactn'; // <-- reactn

const incrementReducer = (count, action) => count + action.amount;

const decrementReducer = (count, action) => count - action.amount;

const MyComponent = () => {
  const increment = useDispatch(incrementReducer, 'count');
  const decrement = useDispatch(decrementReducer, 'count');

  return (
    <div>
      <button onClick={() => increment({ amount: 1 })}>Add 1</button>
      <button onClick={() => increment({ amount: 3 })}>Add 3</button>
      <button onClick={() => decrement({ amount: 5 })}>Subtract 5</button>
    </div>
  );
};

export default MyComponent;
```

#### Helper functions

##### addCallback

Use `addCallback` to execute a function whenever the state changes. The return
value of the callback will update the global state, so be sure to only return
`undefined` or `null` if you do not want the global state to change. Be aware
that always returning a new state value will result in an infinite loop, as the
new global state will trigger the very same callback.

The only parameter is the callback function.

```javascript
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
```

The return value of `addCallback` is a function that, when executed, removes
the callback.

```javascript
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
```

##### addReducer

Use `addReducer` to add a reducer to your global state.

The first parameter is the name of your reducer. You will access your reducer
by this name. `this.dispatch.reducerName` or `useDispatch('reducerName')`.

The second parameter is the reducer function. The reducer function that you
_write_ has at least two parameters: first, the global state; second, a map of
your reducers. The third and onward parameters are the arguments that you pass
when dispatching. The reducer function that you _use_ when dispatching does not
contain the global state or map of reducers. Those are prefixed for you
automatically.

```javascript
import { addReducer, setGlobal, useDispatch, useGlobal } from 'reactn';

// Initialize the global state with the value 0.
setGlobal({ value: 0 });

// When the increment reducer is called, increment the global value by X.
addReducer('increment', (global, dispatch, x = 1) => ({
  value: global.value + x,
}));

function MyComponent() {
  const increment = useDispatch('increment');
  const [value] = useGlobal('value');
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
```

For a class component, the analogous method is
`this.dispatch.increment(value)`.

The `dispatch` parameter on a reducer allows you to write "sagas," or a single
reducer that dispatches other reducers.

```javascript
// add(1)
addReducer('add', (global, dispatch, i) => ({
  x: global.x + i,
}));

// subtract(2)
addReducer('subtract', (global, dispatch, i) => ({
  x: global.x - i,
}));

// addSubtract(1, 2)
addReducer('addSubtract', async (global, dispatch, i, j) => {
  await dispatch.add(i);
  await dispatch.subtract(j);
});
```

##### addReducers

`addReducers` accepts an object where the keys are reducer names and the values
are reducers. `addReducers` is just a convenient shorthand for calling
`addReducer` multiple times.

##### getDispatch

Use `getDispatch` to return an object of the global dispatch functions. You
only want to use this in helper libraries, and _not_ in Components. Components
should use `useDispatch` or `this.dispatch`.

`getDispatch` has no parameters.

```javascript
import { getDispatch } from 'reactn';

// Access this.dispatch.reducerName outside of a Component.
class HelperLibrary {
  getDispatcherFunction() {
    return getDispatch().reducerName;
  }
}
```

##### getGlobal

Use `getGlobal` to return a current snapshot of the global state. You only want
to use this in helper libraries, and _not_ in Components. Components should use
`useGlobal` or `this.global` to ensure that they re-render when the global
state changes. `getGlobal` will not cause a Component reliant on the global
state to re-render, nor will it cause a library function to re-execute. It does
nothing more than return a current snapshot of the global state.

`getGlobal` has no parameters.

```javascript
import { getGlobal } from 'reactn';

// Access this.global.value outside of a Component.
class HelperLibrary {
  getGlobalValue() {
    return getGlobal().value;
  }
}
```

##### removeCallback

Use `removeCallback` to remove a callback that was added via `addCallback`. The
callback must be the same _function reference_. This is equivalent to executing
the return value of `addCallback`.

The only parameter is the callback function itself.

```javascript
import { addCallback, removeCallback, setGlobal } from 'reactn';

function alertCallback(global) {
  alert(global.value);
}

addCallback(alertCallback);

// Alerts the global state value:
setGlobal({ value: 1 }); // 1
setGlobal({ value: 2 }); // 2

// Remove the alert callback:
removeCallback(alertCallback);

// No alerts:
setGlobal({ value: 3 });
setGlobal({ value: 4 });
```

##### resetGlobal

Use `resetGlobal` to reset the global state. This resets all state values,
including callbacks, property listeners, and reducers.

There are no parameters.

```javascript
import { getGlobal, resetGlobal, setGlobal } from 'reactn';

// Set the value.
setGlobal({ value: 1 });

// Get the value.
alert(getGlobal().value); // 1

// Reset the global state.
resetGlobal();

// Get the value.
alert(getGlobal().value); // undefined
```

##### setGlobal

Use `setGlobal` to initialize or update your global state. This is analogous to
calling `this.setGlobal` in a class component or `useGlobal()[1]` in a
function component.

The first parameter is merged into the global state in the same way a class
component's `this.setGlobal` merges its first parameter into the local state.

The optional second parameter is a callback.

`setGlobal` with a new global state:

```javascript
import { setGlobal } from 'reactn';

// Set loading to true.
setGlobal({
  loading: true,
});
```

`setGlobal` with a new global state and a callback:

```javascript
import { setGlobal } from 'reactn';

// Set loading to true.
setGlobal(
  {
    loading: true,
  },

  // After it is set, assert that loading is true.
  global => {
    assert(global.loading === true);
  },
);
```

##### useDispatch

_Requires React >= 16.8.0_

The `useDispatch` helper function is a React Hook analogous to the `useReducer`
hook built into React itself. `useDispatch` will dispatch a global reducer that
has been added to ReactN via the [`addReducer`](#addreducer),
[`addReducers`](#addreducers), or [`withInit`](#withinit) helper functions or a
global reducer that you specify inline as a parameter.

###### useDispatch()

`useDispatch()` with no parameters will return a map of all of your global
reducers.

```javascript
import { useDispatch } from 'reactn';

function MyComponent() {
  const dispatch = useDispatch();
  dispatch.add(1);
  dispatch.substract(2);
  return null;
}
```

###### useDispatch(Function)

`useDispatch(f)` allows you to define your global reducer inline. This method
is particularly useful if you prefer to import your reducers as needed or keep
your singleton reducers with the components that use them.

```javascript
import React, { useDispatch, useGlobal } from 'reactn';

function MyComponent() {
  const [count] = useGlobal('count');
  const add = useDispatch((global, _dispatch, n) => ({
    count: global.count + n,
  }));
  return <button onClick={() => add(1)}>{count}.</span>;
}
```

###### useDispatch(Function, keyof State)

`useDispatch(f, 'property')` allows you to define your global property reducer
inline. A property reducer changes only one property of the global state, which
can greatly simplify your reducer logic.

```javascript
import React, { useDispatch, useGlobal } from 'reactn';

function MyComponent() {
  const [count] = useGlobal('count');
  const add = useDispatch((count, n) => count + n, 'count');
  return <button onClick={() => add(1)}>{count}.</span>;
}
```

###### useDispatch(keyof Reducers)

`useDispatch('reducerName')` allows you to dispatch a global reducer.

```javascript
import React, { useDispatch, useGlobal } from 'reactn';

function MyComponent() {
  const [count] = useGlobal('count');
  const add = useDispatch('add');
  return <button onClick={() => add(1)}>{count}.</span>;
}
```

##### useGlobal

_Requires React >= 16.8.0_

`useGlobal` is a React Hook analogous to the `useState` Hook built into React
itself. `useGlobal` returns the global state or parts thereof.

###### useGlobal()

`useGlobal()` with no parameters will return the entire global state object and
a function for changing properties of the global state.

The `setGlobal` function returned by `useGlobal` is analogous to the
[`setGlobal`](#setglobal) helper function and `this.setGlobal` class method.

```javascript
import React, { useGlobal } from 'reactn';

function MyComponent() {
  const [ global, setGlobal ] = useGlobal();
  const generateNumber = () => {
    setGlobal(g => ({
      generations: g.generations + 1,
      myNumber: Math.floor(Math.random() * 100),
    });
  };
  return (
    <button onClick={generateNumber}>
      #{global.generations}: {global.myNumber}
    </button>
  );
}
```

###### useGlobal(keyof State)

`useGlobal('property')` returns a specific global state property and a function
for updating that property.

```javascript
import React, { useGlobal } from 'reactn';

const getRandomNumber = () => Math.floor(Math.random() * 100);

function MyComponent() {
  const [myNumber, setMyNumber] = useGlobal('myNumber');
  return (
    <button onClick={() => setMyNumber(getRandomNumber())}>{myNumber}</button>
  );
}
```

##### withGlobal

Use `withGlobal` to return a higher-order component to convert global state
values into props. This is highly analogous to `react-redux`'s `connect`
function.

The first parameter is a function for getting global state values.

The second parameter is a function for setting global state values (similar to
`dispatch`).

```javascript
import React, { withGlobal } from 'reactn';

// A button that displays the value and, when clicked, increments it.
function MyComponent(props) {
  return (
    <>
      My value is <button onClick={props.incrementValue} value={props.value} />
    </>
  );
}

export default withGlobal(
  // Set the `value` prop equal to the global state's `value` property.
  global => ({
    value: global.value,
  }),

  // Important Note: This is not the setGlobal helper function.
  // Set the `incrementValue` prop to a function that increments the global
  //   state's `value` property.
  setGlobal => ({
    incrementValue: () => {
      // Important Note: This is not the setGlobal helper function.
      // This is the parameter referenced 4 lines up.
      setGlobal(global => ({
        value: global.value + 1,
      }));
    },
  }),
)(MyComponent);
```

##### withInit

In some cases (such as when using Next.js), you may be unable to run a setup
script prior to your ReactN components mounting. In order to instantiate your
global state and reducers prior to mounting, you may use the `withInit` Higher
Order Component. This HOC will await the setting of your global state before
mounting the provided Lower Order Component (e.g. `<App />`).

```javascript
import React, { useDispatch, useGlobal, withInit } from 'reactn';

const INITIAL_REDUCERS = {
  addOne: ({ count }) => ({
    count: count + 1,
  }),
};

const INITIAL_STATE = {
  count: 0,
};

export default withInit(
  INITIAL_STATE,
  INITIAL_REDUCERS,
)(function App() {
  const addOne = useDispatch('addOne');
  const [count] = useGlobal('count');
  return <button onClick={addOne}>Count: {count}</button>;
});
```

## Known issues

- `super(props)` is incompatible with TypeScript. #126
- Components re-render once per changed subscribed property. #129
- Class components use `componentWillUpdate` without the `UNSAFE_` prefix. #134
- Class components are incompatible with Providers in newer versions of React.
  #132

## Terminology

ReactN strictly maintains accurate terminology for its data structures. The
majority of ReactN's data structures are meant to be black box to simplify the
user experience, only referenced by name in the package's code. They are
outlined here for transparency and to ease community contributions.

### Dispatcher

When you pass a reducer to ReactN via [`addReducer`](#addreducer),
[`addReducers`](#addreducers), [`useDispatch`](#usedispatch), or
[`withInit`](#withinit), ReactN returns a dispatcher.

A dispatcher is a function that wraps a reducer, passing the global state and
global reducers as parameters tying its return value to the global state.
Dispatchers and reducers have a 1-to-1 relationship and are tightly bound to
each other.

In documentation, dispatchers are often referred to as reducers to decrease the
cognitive overhead and conceptually strengthen their 1-to-1 relationship.

For example, an "add" reducer may be defined as follows:

```javascript
function add(global, _dispatch, n) {
  return { count: global.count + n };
}
```

When you call this reducer, you only need to call `add(1)`. This difference in
call signature is because you are calling the _dispatcher_.

A dispatcher, in pseudo-code, conceptually looks as follows:

```javascript
function dispatchAdd(n) {
  const { dispatchers, set, state } = globalStateManager;
  const newGlobalState = add(state, dispatchers, n);
  return set(newGlobalState);
}
```

### Global state manager

The global state manager is the core object that powers ReactN. It maintains
the state, global dispatchers, and subscriptions.

#### Default global state manager

The default global state manager is the global state manager used by all of
ReactN _unless otherwise specified_. To specify a different global state
manager, you must use a
[Provider](https://github.com/CharlesStover/reactn/blob/master/Provider.md).

ReactN Components and Hooks will attempt to find a global state manager via
the Context. If one does not exist via Context, it will fallback to the default
global state manager.

### Reducer

A reducer is a function that accepts the current global state, a map of all
global reducers, and any number of additional parameters. A reducer returns a
change to the global state. It does not need to return the entire new global
state. It only needs to return key-value pairs of changed properties.

An example "add" reducer may be defined as follows:

```javascript
function add(global, _dispatch, n) {
  return { count: global.count + n };
}
```

A reducer may be asynchronous (return a Promise) and asynchronously dispatch
other reducers. You can use a reducer that dispatches other reducers to create
a "saga" of state changes.

```javascript
async function mySaga(global, dispatch, shouldMultiply) {
  if (global.count < 0) {
    await dispatch.add(1);
  }
  await dispatch.subtract(2);
  if (shouldMultiply) {
    await dispatch.multiply(3);
  }
}

mySaga(true); // shouldMultiply = true
```

#### Property reducer

A property reducer is a reducer that only changes one property. They only
receive that property's value as a parameter instead of the entire global state
object, and they do not receive the dispatch object as a parameter at all.

An example "add" property reducer may be defined as follows:

```javascript
function add(count, n) {
  return count + n;
}
```

You must specify the property when _using_ a property reducer. Property
reducers cannot be added to or remembered by the global state manager.

```javascript
import React, { useDispatch, useGlobal } from 'reactn';

function add(count, n) {
  return count + n;
}

function MyComponent() {
  const [count] = useGlobal('count');
  // Use the "add" property reducer on the "count" property.
  const dispatch = useDispatch(add, 'count');
  return <button onClick={() => dispatch(1)}>{count}</button>;
}
```

## Sponsor

If you are a fan of this project, you may
[become a sponsor](https://github.com/sponsors/CharlesStover)
via GitHub's Sponsors Program.

## Support

For support, reach out to us on the
[Reactiflux Discord channel #reactn](https://discord.gg/Tae4vuX).

[![chat](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/Tae4vuX)
