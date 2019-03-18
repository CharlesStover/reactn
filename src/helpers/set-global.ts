import GlobalState from '../global-state';

export default function setGlobal(globalState: GlobalState, newGlobal: NewGlobal, callback: GlobalCallback = null): Promise<GlobalState> {
  return globalState.setAnyCallback(newGlobal, callback);
};
