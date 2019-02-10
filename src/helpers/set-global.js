import defaultGlobalState from '../default-global-state';

export default function setGlobal(newGlobal, callback = null) {
  return defaultGlobalState.setAnyCallback(newGlobal, callback);
};
