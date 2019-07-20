import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import ReactN = require('../src/index');
import ReactNProvider from '../types/provider';
import { Getter } from '../types/with-global';
import { G, INITIAL_STATE } from './utils/initial';



// TS2339: Property 'innerHTML' does not exist on type 'HTMLSpanElement'.
interface Container extends HTMLSpanElement {
  innerHTML: string;
}

interface Props {
  z: string;
}



const INNER_HTML: string = `<span>${INITIAL_STATE.z}</span>`;

const mapGlobalToProps: Getter<G, {}, {}, Props> = ({ z }: G): Props => ({ z });

const TestComponent = ({ z }: Props): JSX.Element => {
  return <span>{z}</span>;
};



describe('withGlobal', (): void => {

  afterEach((): void => {
    cleanup();
    ReactN.resetGlobal();
  });

  it('should support default global state', async (): Promise<void> => {
    await ReactN.setGlobal(INITIAL_STATE);
    const TestComponentHoc: React.ComponentClass<{}> =
      ReactN.withGlobal(mapGlobalToProps)(TestComponent);

    const testComponent = render(<TestComponentHoc />);

    const span: Container = testComponent.container as Container;
    expect(span.innerHTML).toBe(INNER_HTML);
  });

  describe('Provider', (): void => {

    let Provider: ReactNProvider<G>;
    beforeEach((): void => {
      Provider = ReactN.createProvider(INITIAL_STATE);
    });

    it('should support Context', (): void => {
      const TestComponentHoc: React.ComponentClass<{}> =
        ReactN.withGlobal(mapGlobalToProps)(TestComponent);

      const testComponent = render(
        <Provider>
          <TestComponentHoc />
        </Provider>,
      );

      const span: Container = testComponent.container as Container;
      expect(span.innerHTML).toBe(INNER_HTML);
    });
  
    it('should support Provider', (): void => {
      const TestComponentHoc: React.ComponentClass<{}> =
        Provider.withGlobal(mapGlobalToProps)(TestComponent);

      const testComponent = render(<TestComponentHoc />);
  
      const span: Container = testComponent.container as Container;
      expect(span.innerHTML).toBe(INNER_HTML);
    });

  });

});
