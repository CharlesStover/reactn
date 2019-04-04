import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import GlobalStateManager from '../src/global-state-manager';
import { GS, INITIAL_STATE } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';

import useGlobal from '../src/use-global';

describe.only('useGlobal', (): void => {

  let globalStateManager: GlobalStateManager<GS>;
  const spy = spyOn('state');

  beforeEach((): void => {
    globalStateManager = new GlobalStateManager<GS>(INITIAL_STATE);
  });

  afterEach(cleanup);

  it('return default global state and setter', (): void => {
    const { result } = renderHook(() => useGlobal(globalStateManager));

    expect(result.current).toEqual([INITIAL_STATE, expect.any(Function)]);

    // call the setter
    act(() => { result.current[1]({ x: true }); })

    expect(result.current).toEqual([{ ...INITIAL_STATE, x: true }, expect.any(Function)]);
  });

  it('return scoped global state and setter', (): void => {
    const { result } = renderHook(() => useGlobal(globalStateManager, 'x'));

    expect(result.current).toEqual([false, expect.any(Function)]);

    // call the setter
    act(() => { result.current[1](true); })

    expect(result.current).toEqual([true, expect.any(Function)]);
  });
});
