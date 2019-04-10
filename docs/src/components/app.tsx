import React from 'reactn';

interface G {
  name: string;
}

export default class App extends React.Component<{}, {}, G> {
  render() {
    return (
      <div className="app">
        {this.global.name} is coming soon.
      </div>
    );
  }
}
