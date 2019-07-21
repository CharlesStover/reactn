import { render } from '@testing-library/react';
import * as React from 'react';
import ReactN = require('../src/index');
import Dispatcher, { ExtractArguments } from '../types/dispatcher';
import Dispatchers from '../types/dispatchers';
import ReactNProvider from '../types/provider';
import { Getter, Setter } from '../types/with-global';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';
import { hasContext } from './utils/react-version';



interface DispatchProps {
  increment: Dispatcher<G, ExtractArguments<R['increment']>>;
}

interface GlobalProps {
  z: string;
}

type Props = Partial<DispatchProps & GlobalProps>;



const DISPATCH_INNER_TEXT: string = 'function';

const EMPTY_GETTER: Getter<G, R, {}, Props> = (): null => null;

const GLOBAL_INNER_TEXT: string = `undefined ${INITIAL_STATE.z}`;

const mapDispatchToProps: Setter<G, R, {}, Props> =
  (_setGlobal, { increment }: Dispatchers<G, R>): DispatchProps => ({
    increment,
  });

const mapGlobalToProps: Getter<G, R, {}, Props> =
  ({ z }: G): GlobalProps => ({
    z,
  });

const TestComponent = ({ increment, z }: Props): JSX.Element => {
  return <span data-testid="test">{typeof increment} {z}</span>;
};



describe('withGlobal', (): void => {

  afterEach((): void => {
    ReactN.resetGlobal();
  });

  it('should be a function with 2 arguments', (): void => {
    expect(ReactN.withGlobal).toBeInstanceOf(Function);
    expect(ReactN.withGlobal).toHaveLength(2);
  });

  it('should map global to props', async (): Promise<void> => {
    await ReactN.setGlobal(INITIAL_STATE);
    const WrappedTestComponent: React.ComponentType<{}> =
      ReactN.withGlobal(mapGlobalToProps)(TestComponent);
    const { getByTestId } = render(<WrappedTestComponent />);
    // @ts-ignore:
    //   Argument of type '"test"' is not assignable to parameter of type
    //     'MatcherOptions'.
    //   Property 'toHaveTextContent' does not exist on type
    //     'Matchers<HTMLElement>'.
    expect(getByTestId('test')).toHaveTextContent(GLOBAL_INNER_TEXT);
  });

  it('should map dispatch to props', async (): Promise<void> => {
    await ReactN.addReducers(INITIAL_REDUCERS);
    const WrappedTestComponent: React.ComponentType<{}> =
      ReactN.withGlobal(EMPTY_GETTER, mapDispatchToProps)(TestComponent);
    const { getByTestId } = render(<WrappedTestComponent />);
    // @ts-ignore:
    //   Argument of type '"test"' is not assignable to parameter of type
    //     'MatcherOptions'.
    //   Property 'toHaveTextContent' does not exist on type
    //     'Matchers<HTMLElement>'.
    expect(getByTestId('test')).toHaveTextContent(DISPATCH_INNER_TEXT);
  });

  // If Context is not supported,
  if (!hasContext) {
    return;
  }

  describe('Context', (): void => {

    let Provider: ReactNProvider<G, R>;
    beforeEach((): void => {
      Provider = ReactN.createProvider(INITIAL_STATE, INITIAL_REDUCERS);
    });

    it('should map global to props', (): void => {
      const WrappedTestComponent: React.ComponentType<{}> =
        ReactN.withGlobal(mapGlobalToProps)(TestComponent);
      const { getByTestId } = render(
        <Provider>
          <WrappedTestComponent />
        </Provider>,
      );
      // @ts-ignore:
      //   Argument of type '"test"' is not assignable to parameter of type
      //     'MatcherOptions'.
      //   Property 'toHaveTextContent' does not exist on type
      //     'Matchers<HTMLElement>'.
      expect(getByTestId('test')).toHaveTextContent(GLOBAL_INNER_TEXT);
    });
  
    it('should map dispatch to props', (): void => {
      const WrappedTestComponent: React.ComponentType<{}> =
        ReactN.withGlobal(EMPTY_GETTER, mapDispatchToProps)(TestComponent);
      const { getByTestId } = render(
        <Provider>
          <WrappedTestComponent />
        </Provider>,
      );
      // @ts-ignore:
      //   Argument of type '"test"' is not assignable to parameter of type
      //     'MatcherOptions'.
      //   Property 'toHaveTextContent' does not exist on type
      //     'Matchers<HTMLElement>'.
      expect(getByTestId('test')).toHaveTextContent(DISPATCH_INNER_TEXT);
    });
  });
});
