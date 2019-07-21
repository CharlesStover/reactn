import { render } from '@testing-library/react';
import * as React from 'react';
import createProvider from '../../src/create-provider';
import Dispatcher, { ExtractArguments } from '../../types/dispatcher';
import Dispatchers from '../../types/dispatchers';
import ReactNProvider from '../../types/provider';
import { Getter, Setter } from '../../types/with-global';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasContext } from '../utils/react-version';
import itShouldRequireContext from './utils/it-should-require-context';



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



describe('Provider.withGlobal', (): void => {

  // If Context is not supported,
  if (!hasContext) {
    itShouldRequireContext();
    return;
  }



  let Provider: ReactNProvider<G, R>;
  beforeEach((): void => {
    Provider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 2 arguments', (): void => {
    expect(Provider.withGlobal).toBeInstanceOf(Function);
    expect(Provider.withGlobal).toHaveLength(2);
  });

  it('should map global to props', (): void => {
    const WrappedTestComponent: React.ComponentType<{}> =
      Provider.withGlobal(mapGlobalToProps)(TestComponent);
    const { getByTestId } = render(<WrappedTestComponent />);
    // @ts-ignore:
    //   Argument of type '"test"' is not assignable to parameter of type
    //     'MatcherOptions'.
    //   Property 'toHaveTextContent' does not exist on type
    //     'Matchers<HTMLElement>'.
    expect(getByTestId('test')).toHaveTextContent(GLOBAL_INNER_TEXT);
  });

  it('should map dispatch to props', (): void => {
    const WrappedTestComponent: React.ComponentType<{}> =
      Provider.withGlobal(EMPTY_GETTER, mapDispatchToProps)(TestComponent);
    const { getByTestId } = render(<WrappedTestComponent />);
    // @ts-ignore:
    //   Argument of type '"test"' is not assignable to parameter of type
    //     'MatcherOptions'.
    //   Property 'toHaveTextContent' does not exist on type
    //     'Matchers<HTMLElement>'.
    expect(getByTestId('test')).toHaveTextContent(DISPATCH_INNER_TEXT);
  });
});
