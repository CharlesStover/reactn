import globalStateManager from './global-state-manager';

const setGlobal = function(g) {
  globalStateManager.set(
    typeof g === 'function' ?
      g(globalStateManager.state) :
      g
  );
};

export default setGlobal;
