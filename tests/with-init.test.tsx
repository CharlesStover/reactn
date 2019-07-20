import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { ReactNComponent } from '../src/components';
import defaultGlobalStateManager from '../src/default-global-state-manager';
import GlobalStateManager from '../src/global-state-manager';
import resetGlobal from '../src/reset-global';
import useGlobal from '../src/use-global';
import withInit from '../src/with-init';
import { ReactNComponentClass } from '../types/component-class';
import WithInit from '../types/with-init';
import flushPromises from './utils/flush-promises';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



// TS2339: Property 'innerHTML' does not exist on type 'HTMLSpanElement'.
interface Container extends HTMLSpanElement {
  innerHTML: string;
}



const INNER_HTML: string = `<span>${INITIAL_STATE.z}</span>`;

const TestComponent = (): JSX.Element => {
  const [ z ] = useGlobal<G>(
    defaultGlobalStateManager as GlobalStateManager<G, R>,
    'z',
  );
  return <span>{z}</span>;
};





describe('withInit', (): void => {

  afterEach((): void => {
    resetGlobal(defaultGlobalStateManager);
  });

  it('should be a function with 2 arguments', (): void => {
    expect(withInit).toBeInstanceOf(Function);
    expect(withInit).toHaveLength(2);
  });

  describe('return value', (): void => {

    let withInitHoc: WithInit<{}, G, R>;
    beforeEach((): void => {
      withInitHoc = withInit<G, R, {}>(INITIAL_STATE, INITIAL_REDUCERS);
    })

    it('should be a function with 2 arguments', (): void => {
      expect(withInitHoc).toBeInstanceOf(Function);
      expect(withInitHoc).toHaveLength(2);
    });

    describe('return value', (): void => {

      let Component: ReactNComponentClass<{}, {}, G, R>;
      beforeEach((): void => {
        Component = withInitHoc(TestComponent);
      });

      afterEach((): void => {
        cleanup();
      });

      /*
      it('should be a ReactN component class', (): void => {
        expect(Component).toBeInstanceOf(ReactNComponent);
      });
      */
    
      it('should set the default global state', async (): Promise<void> => {
        render(<Component />);
        await flushPromises();
        expect(defaultGlobalStateManager.state).toEqual(INITIAL_STATE);
      });

      it('should render correctly', async (): Promise<void> => {
        const testComponent = render(<Component />);
        await flushPromises();
        const span: Container = testComponent.container as Container;
        expect(span.innerHTML).toBe(INNER_HTML);
      });

      describe('reducers', (): void => {

        const spy = spyOn('addReducer');

        it(
          'should be added to the default global state',
          async (): Promise<void> => {
            render(<Component />);
            await flushPromises();
            expect(spy.addReducer).toHaveBeenCalledTimes(
              Object.keys(INITIAL_REDUCERS).length,
            );
          },
        );
      });
    });
  });
});
