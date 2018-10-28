const globalStateManager = require('./global-state-manager').default;

const { sharedGetGlobal, sharedSetGlobal } = require('./shared');

export const classComponentWillUnmount = _this => {

  // No longer re-render this component on global state change.
  globalStateManager.removeKeyListener(_this._globalCallback);
};

export const classEnqueueForceUpdate = _this => {
  _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
};

export const classGetGlobal = _this =>
  sharedGetGlobal(_this._globalCallback);

export const classSetGlobal = (_this, global, callback) => {
  sharedSetGlobal(
    global,
    callback,
    () => _this.global
  );
};
