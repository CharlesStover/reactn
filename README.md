# reactn
React, but with built-in global state management.

## No Boilerplate!

For class components, simply change `import React from 'react';` to `import React from 'reactn';`, and your React class components will have global state built in!

For functional components, `import { useGlobal } from 'reactn';` to harness the power of React Hooks!

If you prefer decorators, you can continue to use the `react` package for your components and instead `import reactn from 'reactn';` and use the `@reactn` decorator!

## Intuitive!

Global state in class components behaves exactly like local state! Instead of `this.state` and `this.setState` to read and write to the local state, you can use `this.global` and `this.setGlobal` to read and write to the global state object.

Global state in functional components behaves almost identically to local state. Instead of `[ value, setValue ] = useState(default)`, you can use `[ value, setValue ] = useState(key)` where the key is the key of the global state to which you want to read and write. You may also use `[ global, setGlobal ] = useGlobal()` to access the entire global object.

## Install

* `npm install reactn` or
* `yarn add reactn`

## Example (Class Component)

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

## Example (Functional Component)

Using React Hooks in React v16.7, you can harness `useGlobal` to access the global state.

The above component re-written as a functional component would look like this:

```JavaScript
import React from 'react';
import { useGlobal } from 'reactn';
import AddCard from '../add-card/add-card';
import Card from '../card/card';
import './cards.scss';

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
