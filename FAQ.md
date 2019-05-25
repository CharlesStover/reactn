# Frequently Asked Questions

* [With what version of React is ReactN bundled?](#with-what-version-of-react-is-reactn-bundled)
* [What version(s) of React does ReactN support?](#what-versions-of-react-does-reactn-support)
* [What if my project requires a clean copy of React also?](#what-if-my-project-requires-a-clean-copy-of-react-also)
* [When do I import from React and when do I import from ReactN?](#when-do-i-import-from-react-and-when-do-i-import-from-reactn)
* [Is my `create-react-app` project supported?](#is-my-create-react-app-project-supported)
* [How do components update?](#how-do-components-update)

## With what version of React is ReactN bundled?

ReactN does _not_ come bundled with React. You must install React alongside it.
ReactN piggybacks off whatever version of React that you choose to use.

## What version(s) of React does ReactN support?

You may use _any_ version of React with ReactN.
You may freely upgrade or downgrade to any version of React without impacting
your ReactN installation.

## What if my project requires a clean copy of React also?

ReactN does _not_ mutate the React package or object. It extends a copy of it.
You can use React and ReactN _in the same project_, even _in the same file_!

Your `react` package and its imports are completely unmodified by the use of
ReactN.

```
import React from 'react';
import ReactN from 'reactn';
assert(React.Component !== ReactN.Component);
```

## When do I import from React and when do I import from ReactN?

The simplest solution is to _always import from `reactn`_, as ReactN exports
the entire React package _in addition_ to global state functionality. Any time
importing from React will work, importing from ReactN will also work.

If your functionality exists on the React package, such as
`React.createElement`, you may import that functionality from `react`.

If your functionality involves global state, such as the `setGlobal` helper
function, `useGlobal` hook, or ReactN versions of `Component` and
`PureCompnent` (which implement the global state member variables and methods),
you _must_ import them from `reactn`.

## Is my `create-react-app` project supported?

Yes! ReactN supports projects bootstrapped with `create-react-app`.

## How do components update?

When a component's _local_ state changes, that component "updates" or
re-renders.

It would not be performant to update _every_ component when the global state
changes. Instead, a component only updates if a global state root property that
that component has accessed has changed.

If your component accesses `this.global.x`, it _will not_ re-render when
`this.global.y` changes.

If your component accesses `this.global.myObject.x`, it _will_ re-render when
`this.global.myObject.y` changes, because the root property `myObject` has
changed. You should take this into consideration when nesting objects in your
global state.

If you strongly desire to circumvent this behavior, you may use the
`withGlobal` higher-order component to wrap a `React.memo` functional component
or `PureComponent`.

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
)(Me);
```
