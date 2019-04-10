import React from 'react';
import Header from '../header';
import './app.scss';

interface G {
  name: string;
}

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          ReactN is coming soon.
        </main>
      </div>
    );
  }
}
