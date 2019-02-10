import defaultGlobalState from '../default-global-state';

export default function addCallback(f) {
  return defaultGlobalState.addCallback(f);
};
