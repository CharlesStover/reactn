# ReactN

ReactN is a extension of React that includes global state management.

[![package](https://img.shields.io/github/package-json/v/CharlesStover/reactn.svg)](https://www.npmjs.com/package/reactn/)
[![minified size](https://img.shields.io/bundlephobia/min/reactn.svg)](https://www.npmjs.com/package/reactn)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/reactn.svg)](https://www.npmjs.com/package/reactn)

## Table of Contents

* [Getting Started](#getting-started)
  * [Install](#install)
  * [Examples](#examples)
    * [Class Components](#class-components)
    * [Functional Components](#functional-components)
* [Features](#features)
  * [No Boilerplate!](#no-boilerplate)
  * [Intuitive!](#intuitive)
* [Frequently Asked Questions](https://github.com/CharlesStover/reactn/blob/master/FAQ.md)

## Getting Started

### Install

* `npm install reactn --save` or
* `yarn add reactn`

Initialize your global state using the `setGlobal` helper function. In most cases, you do not want to initialize your global state in a component lifecycle method, as the global state should exist before your components attempt to render.

It is recommended that you initialize the global state just prior to mounting with `ReactDOM`, the same way a Redux store would be initialized this way.

```JavaScript
import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import App from './App';

// Set an initial global state directly:
setGlobal({
  cards: [],
  disabled: false.
  initial: 'values'.
  x: 1
});

ReactDOM.render(<App />, document.getElementById('root'));
```

### Examples

#### Class Components

```JavaScript
import React from 'reactn'; // <-- reactn
import Card from '../card/card';

// Render all cards in the global state.
export default class Cards extends React.PureComponent {

  componentDidMount() {

    // Hydrate the global state with the response from /api/cards.
    this.setGlobal(
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

Using React Hooks in React v16.7,
you can harness `useGlobal` to access the global state.

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

## Features

### No Boilerplate!

For functional components, `import { useGlobal } from 'reactn';` to harness the power of React Hooks!

For class components, simply change `import React from 'react';` to `import React from 'reactn';`, and your React class components will have global state built in!

If you prefer class decorators, you can continue to `import React from 'react';` for your components and additionally `import reactn from 'reactn';` for access to the `@reactn` decorator!

### Intuitive!

Global state in functional components behaves almost identically to local state. Instead of `[ value, setValue ] = useState(defaultValue)`, you can use `[ value, setValue ] = useGlobal(key)` where `key` is the key of the global state from which you want to read and to which you want write.

You may alternatively use `[ global, setGlobal ] = useGlobal()` to access the entire global object.

Global state in class components behaves exactly like local state! Instead of `this.state` and `this.setState` to read and write to the local state, you can use `this.global` and `this.setGlobal` to read from and write to the global state object.

If you prefer Redux's `connect` functionality, pure functions, or are dealing with deeply nested objects, a `withGlobal` higher-order component is also available.
