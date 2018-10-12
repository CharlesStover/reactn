import React from 'react';
import reactn from 'reactn';

class Y extends React.Component {

  renders = 0;

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
        <div children={'The value of Y is: ' + this.global.y + '.'} />
        <pre><code children={`
this.global.y
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
        <br />
      </React.Fragment>
    );
  }
}

export default reactn(Y);
