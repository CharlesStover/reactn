import React from 'react';
import reactn from 'reactn';

class AsyncX extends React.Component {

  renders = 0;

  handleClick = () => {
    this.global.asyncAddToX(5);
  };

  get times() {
    if (this.renders === 1) {
      return '1 time';
    }
    return this.renders + ' times';
  }

  render() {
    this.renders++;
    return (
      <React.Fragment>
        <button
          children="Add 5 to X"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.global.asyncAddToX(5);
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(AsyncX);
