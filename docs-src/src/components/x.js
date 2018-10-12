import React from 'react';
import reactn from 'reactn';

class X extends React.PureComponent {

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
        <div children={'The value of X is: ' + this.global.x + '.'} />
        <pre><code children={`
this.global.x
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
        <br />
      </React.Fragment>
    );
  }
}

export default reactn(X);
