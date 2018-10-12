import React from 'react';
import reactn from 'reactn';

class AsyncY extends React.Component {

  renders = 0;

  handleClick = () => {
    this.global.asyncSubtractFromY(2);
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
          children="Subtract 2 from Y"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.global.asyncSubtractFromY(2);
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(AsyncY);
