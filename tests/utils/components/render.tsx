import * as TestRenderer from 'react-test-renderer';

// It should render without crashing.
export default function itShouldRender(Super) {

  it('should render without crashing', () => {

    // ReactN component
    class TestComponent extends Super {
      render() {
        return this.global.x || null;
      }
    }

    // @ts-ignore
    TestRenderer.create(<TestComponent />);
  });
};
