# ReactN [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=ReactN%20offers%20global%20state%20management%20baked%20into%20React!&url=https://github.com/CharlesStover/reactn&via=CharlesStover&hashtags=react,reactjs,javascript,typescript,webdev,webdevelopment)

ReactN is a extension of React that includes global state management.

[![version](https://img.shields.io/npm/v/reactn.svg)](https://www.npmjs.com/package/reactn)
[![minified size](https://img.shields.io/bundlephobia/min/reactn.svg)](https://www.npmjs.com/package/reactn)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/reactn.svg)](https://www.npmjs.com/package/reactn)
[![downloads](https://img.shields.io/npm/dt/reactn.svg)](https://www.npmjs.com/package/reactn)
[![build](https://api.travis-ci.com/CharlesStover/reactn.svg)](https://travis-ci.com/CharlesStover/reactn/)

## Install

* `npm install reactn --save` or
* `yarn add reactn`

## Features

### No Boilerplate!

For function components, `import { useGlobal } from 'reactn';` to harness the
power of React Hooks!

For class components, simply change `import React from 'react';` to
`import React from 'reactn';`, and your React class components will have global
state built in!

If you prefer class decorators, you can continue to
`import React from 'react';` for your components and additionally
`import reactn from 'reactn';` for access to the `@reactn` decorator!

### Intuitive!

#### Function Components

Global state in function components behaves almost identically to local state.
Instead of `[ value, setValue ] = useState(defaultValue)`, you can use
`[ value, setValue ] = useGlobal(property)` where `property` is the property of
the global state you want to get and set.

You may also use `[ global, setGlobal ] = useGlobal()` to access the entire
global object.

You may also use `[ state, dispatch ] = useGlobal(reducerFunction)` to mimic
the behavior of `useReducer`, where instead of providing an initial state, the
state of the reducer is the ReactN global state object.

#### Class Components

Global state in class components behaves exactly like local state! Instead of
`this.state` and `this.setState` to get and set the local state, you can use
`this.global` and `this.setGlobal` to get and set the global state.

Alternatively, the `@reactn` decorator allows you to convert classes that
extend `React.Component` to ReactN global state components.

#### Map State to Props

If you prefer Redux's `connect` functionality, pure functions, or are dealing
with deeply nested objects, a
[`withGlobal` higher-order component](#withglobal) is also an available option.

## Table of Contents

* [Install](#install)
* [Features](#features)
  * [No Boilerplate!](#no-boilerplate)
  * [Intuitive!](#intuitive)
* [Getting Started](#getting-started)
  * [Managing Multiple States](#managing-multiple-states)
  * [Initializing Your State](#initializing-your-state)
  * [Examples](#examples)
    * [Class Components](#class-components)
    * [Class Components (with Decorator)](#class-components-with-decorator)
    * [Functional Components](#functional-components)
    * [Helper Functions](#helper-functions)
      * [addCallback](#addcallback)
      * [addReducer](#addreducer)
      * [getGlobal](#getglobal)
      * [removeCallback](#removecallback)
      * [resetGlobal](#resetglobal)
      * [setGlobal](#setglobal)
* [Frequently Asked Questions](https://github.com/CharlesStover/reactn/blob/master/FAQ.md)

## Getting Started

### Managing Multiple States

**This README is for managing a single global state.** This is ideal for most
applications. If you are using concurrent server-side rendering or otherwise
want to work with multiple global states, follow the README for the
[Provider](https://github.com/CharlesStover/reactn/blob/master/Provider.md)
component, which allows you to limit a ReactN state to a React Context.

If you are unsure whether or not you need multiple global states, then you do
not need multiple global states.

### Initializing Your State

You can initialize your global state using the `setGlobal` helper function. In
most cases, you do not want to initialize your global state in a component
lifecycle method, as the global state should exist before your components
attempt to render.

It is recommended that you initialize the global state just prior to mounting
with `ReactDOM`, the same way a Redux store would be initialized this way.

```JavaScript
import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import App from './App';

// Set an initial global state directly:
setGlobal({
  cards: [],
  disabled: false,
  initial: 'values',
  x: 1
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Examples

#### Class Components

By importing React from `reactn` instead of `react`, you bake global state
directly into the React namespace. As a result, `Component` and `PureComponent`
will have access to the `global` member variable and `setGlobal` method.

```JavaScript
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
        .catch(err => ({ error: err }))
    );
  }

  render() {

    // For each card in the global state, render a Card component.
    // this.global returns the global state,
    //   much the same way this.state returns the local state.
    return (
      <div>
        {this.global.cards.map(card =>
          <Card
            key={card.id}
            {...card}
          />
        )}
      </div>
    );
  }
}
```

#### Class Components (with Decorator)

By importing React and ReactN separately, the React namespace remains
unchanged. You can inject ReactN's global functionality into your vanilla React
component by using the `@reactn` decorator imported from the `reactn` package.

```JavaScript
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
        .catch(err => ({ error: err }))
    );
  }

  render() {

    // For each card in the global state, render a Card component.
    // this.global returns the global state,
    //   much the same way this.state returns the local state.
    return (
      <div>
        {this.global.cards.map(card =>
          <Card
            key={card.id}
            {...card}
          />
        )}
      </div>
    );
  }
}
```

#### Functional Components

Using [React Hooks](https://reactjs.org/docs/hooks-intro.html) in version 16.8
(or above), you can harness `useGlobal` to access the global state.

```JavaScript
import React, { useGlobal } from 'reactn'; // <-- reactn
import Card from '../card/card';

// Render all cards in the global state.
const Cards = () => {

  // Use the hook to get all cards in the global state.
  //   setCards is not used in this example.
  const [ cards, setCards ] = useGlobal('cards');

  // For each card in the global state, render a Card component.
  return (
    <div>
      {cards.map(card =>
        <Card
          key={card.id}
          {...card}
        />
      )}
    </div>
  );
};

export default Cards;
```

You may also use the `useGlobal` hook analogously to the `useReducer` hook by
providing a function to `useGlobal`.

```JavaScript
import React, { useGlobal } from 'reactn'; // <-- reactn

const incrementReducer = (global, action) => ({
  count: global.count + action.amount
});

const decrementReducer = (global, action) => ({
  count: global.count - action.amount
});

const MyComponent = () => {

  // In most cases, you only want the dispatch function and not a copy of the
  //   global state.
  const dispatch1 = useGlobal(incrementReducer);

  // You may use [ state, dispatch ] to match useReducer, where state is the
  //   global state.
  const [ state, dispatch2 ] = useGlobal(decrementReducer);

  return (
    <div>
      <button onClick={() => dispatch1({ amount: 1 })}>Add 1</button>
      <button onClick={() => dispatch1({ amount: 3 })}>Add 3</button>
      <button onClick={() => dispatch2({ amount: 5 })}>Subtract 5</button>
    </div>
  );
};

export default MyComponent;
```

#### Helper Functions

##### addCallback

Use `addCallback` to execute a function whenever the state changes. The return
value of the callback will update the global state, so be sure to only return
`undefined` or `null` if you do not want the global state to change. Be aware
that always returning a new state value will result in an infinite loop, as the
new global state will trigger the very same callback.

The only parameter is the callback function.

```JavaScript
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

```JavaScript
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
by this name: `this.global.reducerName` or `useGlobal('reducerName')`.

The second parameter is the reducer function. The reducer function that you
_write_ has two parameters: first, the global state; second, the value passed
to the reducer. The reducer function that you _use_ has one parameter: the
value to pass to the reducer.

```JavaScript
import { addReducer, setGlobal, useGlobal } from 'reactn';

// Initialize the global state with the value 0.
setGlobal({ value: 0 });

// When the increment reducer is called, increment the global value by X.
addReducer('increment', (global, x = 1) => ({
  value: global.value + x
}));

function MyComponent() {
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
```

For a class component, the analogous method is `this.global.increment(value)`.

##### getGlobal

Use `getGlobal` to return a current snapshot of the global state. You only want
to use this in helper libraries, and _not_ in Components. Components should use
`useGlobal` or `this.global` to insure that they re-render when the global
state changes. `getGlobal` will not cause a Component reliant on the global
state to re-render, nor will it cause a library function to re-execute. It does
nothing more than return a current snapshot of the global state.

`getGlobal` has no parameters.

```JavaScript
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

```JavaScript
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

```JavaScript
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
functional component.

The first parameter is the new global state that you want to set.

The optional second parameter is a callback.

`setGlobal` with a new global state:

```JavaScript
import { setGlobal } from 'reactn';

// Set loading to true.
setGlobal({
  loading: true
});
```

`setGlobal` with a new global state and a callback:

```JavaScript
import { setGlobal } from 'reactn';

// Set loading to true.
setGlobal(
  {
    loading: true
  },

  // After it is set, assert that loading is true.
  global => {
    assert(global.loading === true);
  }
);
```

##### withGlobal

Use `withGlobal` to return a higher-order component to convert global state
values into props. This is highly analogous to `react-redux`'s `connect`
function.

The first parameter is a function for getting global state values.

The second parameter is a function for setting global state values (similar to
`dispatch`).

```JavaScript
import React, { withGlobal } from 'reactn';

// A button that displays the value and, when clicked, increments it.
function MyComponent(props) {
  return (
    <>
      My value is{' '}
      <button
        onClick={props.incrementValue}
        value={props.value}
      />
    </>
  );
}

export default withGlobal(

  // Set the `value` prop equal to the global state's `value` property.
  global => ({
    value: global.value
  }),

  // Important Note: This is not the setGlobal helper function.
  // Set the `incrementValue` prop to a function that increments the global
  //   state's `value` property.
  setGlobal => ({
    incrementValue: () => {

      // Important Note: This is not the setGlobal helper function.
      // This is the parameter referenced 4 lines up.
      setGlobal(global => ({
        value: global.value + 1
      }));
    }
  })
)(MyComponent);

```
