import { act, getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import GlobalStateManager from '../../src/global-state-manager';
import setGlobal from '../../src/set-global';
import useGlobal from '../../src/use-global';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import { hasAsyncAct, hasHooks } from '../utils/react-version';

const TEST_ID = 'test-id';

const createTestComponent = (
  globalStateManager: GlobalStateManager<G, R>,
): React.ComponentType<React.PropsWithChildren<{}>> => {
  return function TestComponent(): JSX.Element {
    const [global] = useGlobal(globalStateManager);
    return <span data-testid={TEST_ID} id={global.z} />;
  };
};

describe('useGlobal() component', (): void => {
  if (!hasAsyncAct || !hasHooks) {
    return;
  }

  let globalStateManager: GlobalStateManager<G, R>;
  let TestComponent: React.ComponentType<React.PropsWithChildren<{}>>;
  beforeEach((): void => {
    globalStateManager = new GlobalStateManager(
      INITIAL_STATE,
      INITIAL_REDUCERS,
    );
    TestComponent = createTestComponent(globalStateManager);
  });

  it('should re-render when the global state changes', async (): Promise<
    void
  > => {
    const NEW_STATE_1 = 'new-string-1';
    const NEW_STATE_2 = 'new-string-2';
    const { container }: RenderResult = render(<TestComponent />);
    const getNode = (): any =>
      getByTestId(container, TEST_ID) as HTMLSpanElement;
    expect(getNode().getAttribute('id')).toBe(INITIAL_STATE.z);
    expect(getNode().getAttribute('id')).not.toBe(NEW_STATE_1);

    await act(
      async (): Promise<void> => {
        await setGlobal(globalStateManager, { z: NEW_STATE_1 });
      },
    );

    expect(getNode().getAttribute('id')).toBe(NEW_STATE_1);
    expect(getNode().getAttribute('id')).not.toBe(NEW_STATE_2);

    await act(
      async (): Promise<void> => {
        await setGlobal(globalStateManager, { z: NEW_STATE_2 });
      },
    );

    expect(getNode().getAttribute('id')).toBe(NEW_STATE_2);
  });
});
