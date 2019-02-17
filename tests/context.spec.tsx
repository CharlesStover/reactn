import { expect } from 'chai';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {
  Component, createProvider, getGlobal, resetGlobal, setGlobal
} from '../index';

// @ts-ignore
global.React = React;

describe('ReactN Context', () => {

  afterEach(resetGlobal);

  it('should be separate from the default global state', () => {

    // Test default global state.
    setGlobal({ x: 0 });
    expect(getGlobal().x).to.equal(0);

    // Test default global state is unchanged.
    createProvider({ x: 1 });
    expect(getGlobal().x).to.equal(0);
  });

  it('should influence ReactN Component global state', () => {

    class TestComponent extends Component {
      render() {
        return this.global.x;
      }
    }

    // Render a ReactN Component without providing a context.
    setGlobal({ x: 0 });
    // @ts-ignore: Missing --jsx flag.
    const noContext = TestRenderer.create(<TestComponent />).toJSON();
    expect(noContext).to.equal('0');

    // Render a ReactN Component while providing a context.
    const Provider = createProvider({ x: 1 });
    const yesContext = TestRenderer.create(
      // @ts-ignore: Missing --jsx flag.
      <Provider><TestComponent /></Provider>
    ).toJSON();
    expect(yesContext).to.equal('1');

    // Make sure context didn't impact non-context components.
    // @ts-ignore: Missing --jsx flag.
    const undoContext = TestRenderer.create(<TestComponent />).toJSON();
    expect(undoContext).to.equal('0');
  });
});
