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
          <strong>ReactN</strong>{' '}
          is a global state management solution for{' '}
          <strong>ReactJS</strong>.
        </main>
      </div>
    );
  }
}
