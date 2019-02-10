import defaultGlobalState from '../default-global-state';

export default function getGlobal() {
  return defaultGlobalState.stateWithReducers;
};
