import React from 'react';
import reactn from 'reactn';

class UpdateX extends React.Component {

  renders = 0;

  handleClick = () => {
    this.setGlobal(global => ({
      x: global.x + 1
    }));
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
          children="Update X"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.setGlobal(global => ({
  x: global.x + 1
});
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(UpdateX);
