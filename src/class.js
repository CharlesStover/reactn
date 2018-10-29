const globalStateManager = require('./global-state-manager');
const { sharedGetGlobal, sharedSetGlobal } = require('./shared');

module.exports = {

  classComponentWillUnmount: _this => {

    // No longer re-render this component on global state change.
    globalStateManager.removeKeyListener(_this._globalCallback);
  },

  classEnqueueForceUpdate: _this => {
    _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
  },

  classGetGlobal: _this =>
    sharedGetGlobal(_this._globalCallback),

  classSetGlobal: (_this, global, callback) => {
    sharedSetGlobal(
      global,
      callback,
      () => _this.global
    );
  }
}
