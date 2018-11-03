# ReactN

ReactN is a extension of React that includes global state management.

[![package](https://img.shields.io/github/package-json/v/CharlesStover/reactn.svg)](https://www.npmjs.com/package/reactn/)
[![minified size](https://img.shields.io/bundlephobia/min/reactn.svg)](https://www.npmjs.com/package/reactn)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/reactn.svg)](https://www.npmjs.com/package/reactn)

## Table of Contents

* [Frequently Asked Questions](#frequently-asked-questions)
  * [With what version of React is ReactN bundled?](#with-what-version-of-react-is-reactn-bundled)
  * [What version(s) of React does ReactN support?](#what-versions-of-react-does-reactn-support)
  * [What if my project requires a clean copy of React also?](#what-if-my-project-requires-a-clean-copy-of-react-also)
  * [When do I import from React and when do I import from ReactN?](#when-do-i-import-from-react-and-when-do-i-import-from-reactn)
  * [Is my `create-react-app` project supported?](#is-my-create-react-app-project-supported)
* [Features](#features)
  * [No Boilerplate!](#no-boilerplate)
  * [Intuitive!](#intuitive)
* [Install](#install)
* [Examples](#examples)
  * [Class Components](#class-components)
  * [Functional Components](#functional-components)
* [Updating the Component (Re-Rendering)](#updating-the-component-re-rendering)

## Frequently Asked Questions

### With what version of React is ReactN bundled?

ReactN does _not_ come bundled with React. You must install React alongside it.
ReactN piggybacks off whatever version of React that you choose to use.

### What version(s) of React does ReactN support?

You may use _any_ version of React with ReactN.
You may freely upgrade or downgrade to any version of React without impacting your ReactN installation.

### What if my project requires a clean copy of React also?

ReactN does _not_ mutate the React package or object. It extends a copy of it.
You can use React and ReactN _in the same project_, even _in the same file_!

Your `react` package and its imports are completely unmodified by the use of ReactN.

```
import React from 'react';
import ReactN from 'reactn';
assert(React.Component !== ReactN.Component);
```

### When do I import from React and when do I import from ReactN?

The simplest solution is to _always import from `reactn`_, as ReactN exports the entire React package _in addition_ to global state functionality.
Any time importing from React will work, importing from ReactN will also work.

If your functionality exists on the React package, such as `React.createElement`, you may import that functionality from `react`.

If your functionality involves global state, such as the `setGlobal` helper function, `useGlobal` hook, or ReactN versions of `Component` and `PureCompnent` (which implement the global state member variables and methods), you _must_ import them from `reactn`.

### Is my `create-react-app` project supported?

Yes! ReactN supports projects bootstrapped with `create-react-app`.

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

## Install

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

## Examples

### Class Components

The below example reads an array of cards from the global state. The cards are deleted from the global state via the `Card` component and added to the global state via the `AddCard` comonent. Despite this, the `Cards` component can still access them and will re-render whenever either other component updates the cards in the global state.

```JavaScript
import React from 'reactn'; // uses reactn for built-in global state on components
import AddCard from '../add-card/add-card';
import Card from '../card/card';

// Render all cards in the global state, plus an additional Add Card button.
export default class Cards extends React.PureComponent {

  // For each card in the global state, render a Card component.
  get cards() {

    // this.global returns the global state,
    //   much the same way this.state returns the local state.
    return this.global.cards.map(card =>
      <Card
        key={card.id}
        {...card}
      />
    );
  }

  render() {
    return (
      <div className="cards">
        {this.cards}
        <AddCard />
      </div>
    );
  }
}
```

### Functional Components

Using React Hooks in React v16.7, you can harness `useGlobal` to access the global state.

The above component is re-written below as a functional component.

```JavaScript
import React, { useGlobal } from 'reactn';
import AddCard from '../add-card/add-card';
import Card from '../card/card';

// Render all cards in the global state, plus an additional Add Card button.
const Cards = () => {

  const [ cards ] = useGlobal('cards');

  // For each card in the global state, render a Card component.
  return (
    <div className="cards">
      {cards.map(card =>
        <Card
          key={card.id}
          {...card}
        />
      )}
      <AddCard />
    </div>
  );
};

export default Cards;
```

## Updating the Component (Re-Rendering)

When a component's _local_ state changes, that component "updates" or re-renders.

It would not be performant to update _every_ component when the global state changes.
Instead, a component only updates if a global state root key that that component has accessed has changed.

If your component accesses `this.global.x`, it _will not_ re-render when `this.global.y` changes.

If your component accesses `this.global.myObject.x`, it _will_ re-render when `this.global.myObject.y` changes, because the root key `myObject` has changed. You should take this into consideration when nesting objects in your global state.

If you strongly desire to circumvent this behavior, you may use the `withGlobal` higher-order component to wrap a `React.memo` functional component or `PureComponent`.

```JavaScript
import React, { memo, withGlobal } from 'reactn';

const Me = memo(
  ({ age, name }) =
    <p>My name is {name}, and I am {age}!</p>
);

export default withGlobal(
  (global, props) => ({
    age: global.people[props.person].age,
    name: global.people[props.person].name
  })
)(MyName);
```
