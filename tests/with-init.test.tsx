import { render } from '@testing-library/react';
import * as React from 'react';
import { ReactNComponent } from '../src/components';
import defaultGlobalStateManager from '../src/default-global-state-manager';
import resetGlobal from '../src/reset-global';
import withInit from '../src/with-init';
import { ReactNComponentClass } from '../types/component-class';
import WithInit from '../types/with-init';
import flushPromises from './utils/flush-promises';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const INNER_TEXT: string = `function ${INITIAL_STATE.z}`;

class TestComponent extends ReactNComponent<{}, {}, G, R> {
  public render(): JSX.Element {
    return <span data-testid="test">
      {typeof this.dispatch.increment} {this.global.z}
    </span>;
  }
}



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
        const { getByTestId } = render(<Component />);
        await flushPromises();
        // @ts-ignore:
        //   Argument of type '"test"' is not assignable to parameter of type
        //     'MatcherOptions'.
        //   Property 'toHaveTextContent' does not exist on type
        //     'Matchers<HTMLElement>'.
        expect(getByTestId('test')).toHaveTextContent(INNER_TEXT);
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
