import React from 'react';
import reactn from 'reactn';

class ReducerX extends React.Component {

  renders = 0;

  handleClick = () => {
    this.global.addToX(3);
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
          children="Add 3 to X"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.global.addToX(3);
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(ReducerX);
