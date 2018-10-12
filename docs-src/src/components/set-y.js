import React from 'react';
import reactn from 'reactn';

const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

class UpdateY extends React.PureComponent {

  renders = 0;

  handleClick = () => {
    this.setGlobal({
      y: random(0, 100)
    });
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
          children="Update Y"
          onClick={this.handleClick}
        />
        <pre><code children={`
this.setGlobal({
  y: random(0, 100)
});
`} /></pre>
        <div children={'I have rendered ' + this.times + '.'} />
      </React.Fragment>
    );
  }
}

export default reactn(UpdateY);
