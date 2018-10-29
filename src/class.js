const globalStateManager = require('./global-state-manager');

module.exports = {

  classComponentWillUnmount: _this => {

    // No longer re-render this component on global state change.
    globalStateManager.removeKeyListener(_this._globalCallback);
  },

  classEnqueueForceUpdate: _this => {
    _this.updater.enqueueForceUpdate(_this, null, 'forceUpdate');
  },

  classGetGlobal: _this =>
    globalStateManager.spyStateWithReducers(_this._globalCallback),

  classSetGlobal: (_this, global, callback) => {
    globalStateManager.setAnyCallback(global, callback);
  }
};
