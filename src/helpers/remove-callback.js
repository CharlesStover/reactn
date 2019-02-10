import defaultGlobalState from '../default-global-state';

export default function removeCallback(f) {
  return defaultGlobalState.removeCallback(f);
};
