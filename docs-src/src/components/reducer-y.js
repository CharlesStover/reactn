import React from 'react';
import reactn from 'reactn';

class ReducerY extends React.Component {

  renders = 0;

  handleClick = () => {
    this.global.subtractFromY(1);
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
          children="Subtract 1 from Y"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.global.subtractFromY(1);
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(ReducerY);
