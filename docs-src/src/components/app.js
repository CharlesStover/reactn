import React from 'react';
import { init, reducers } from 'reactn';
import AsyncX from './async-x';
import AsyncY from './async-y';
import ReducerX from './reducer-x';
import ReducerY from './reducer-y';
import SetX from './set-x';
import SetY from './set-y';
import X from './x';
import Y from './y';

init({
  x: 0,
  y: 0
});

reducers.addToX = (global, add) => ({
  x: global.x + add
});

reducers.asyncAddToX = (_, add) =>
  new Promise(resolve => {
    setTimeout(
      () => {
        resolve(global => ({
          x: global.x + add
        }));
      },
      1000
    );
  });

let debounceY = null;
reducers.asyncSubtractFromY = (_, sub) => {
  if (typeof debounceY === 'function') {
    debounceY();
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => {
        debounceY = null;
        resolve(global => ({
          y: global.y - sub
        }));
      },
      1000
    );
    debounceY = () => {
      clearTimeout(timeout);
      reject(null);
    };
  });
};

reducers.subtractFromY = (global, sub) => ({
  y: global.y - sub
});

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>ReactN Demo</h1>
        <hr />
        <h2>global and setGlobal</h2>
        <p>The below demo initialized with x=0 and y=0.</p>
        <p>The value of X is accessed via <code>this.global.x</code>.</p>
        <p>The value of Y is accessed via <code>this.global.y</code>.</p>
        <p>The value of X is set via <code>this.setGlobal</code> using a function.</p>
        <p>The value of Y is set via <code>this.setGlobal</code> using an object.</p>
        <p>Setting a global property only re-renders components that use that global property.</p>
        <p>Updating X does not re-render components that read Y. Updating Y does not re-render components that read X.</p>
        <pre><code children={`
init({
  x: 0,
  y: 0
});
`} /></pre>
        <div className="row">
          <div className="column">
            <h3>Component One:</h3>
            <X />
          </div>
          <div className="column">
            <h3>Component Two:</h3>
            <Y />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h3>Component Three:</h3>
            <SetX />
          </div>
          <div className="column">
            <h3>Component Four:</h3>
            <SetY />
          </div>
        </div>
        <hr />
        <h2>Reducers</h2>
        <p>The below demo uses reducers to update the global state.</p>
        <p>A reducer takes a current copy of the global state and any parameters to return a new state.</p>
        <p>Note that the values of X and Y here are the same as the values of X and Y above, because they are <em>global</em>.</p>
        <pre><code children={`
reducers.addToX = (global, add) => ({
  x: global.x + add
});

reducers.subtractFromY = (global, sub) => ({
  y: global.y - sub
});
`} /></pre>
        <div className="row">
          <div className="column">
            <h3>Component One:</h3>
            <X />
          </div>
          <div className="column">
            <h3>Component Two:</h3>
            <Y />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h3>Component Five:</h3>
            <ReducerX />
          </div>
          <div className="column">
            <h3>Component Six:</h3>
            <ReducerY />
          </div>
        </div>
        <hr />
        <h2>Asynchronous Reducers</h2>
        <p>The below demo uses asynchronous reducers to update the global state.</p>
        <p>The result of the Promise returned by the reducer will be the new state.</p>
        <pre><code children={`
reducers.asyncAddToX = (_, add) =>
  new Promise(resolve => {
    setTimeout(
      () => {
        resolve(global => ({
          x: global.x + add
        }));
      },
      1000
    );
  });

let debounceY = null;
reducers.asyncSubtractFromY = (_, sub) => {
  if (typeof debounceY === 'function') {
    debounceY();
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => {
        debounceY = null;
        resolve(global => ({
          y: global.y - sub
        }));
      },
      1000
    );
    debounceY = () => {
      clearTimeout(timeout);
      reject(null);
    };
  });
};
`} /></pre>
        <div className="row">
          <div className="column">
            <h3>Component One:</h3>
            <X />
          </div>
          <div className="column">
            <h3>Component Two:</h3>
            <Y />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h3>Component Seven:</h3>
            <AsyncX />
          </div>
          <div className="column">
            <h3>Component Eight:</h3>
            <AsyncY />
          </div>
        </div>
      </div>
    );
  }
}
