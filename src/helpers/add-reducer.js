const createReducer = require('../create-reducer');
const defaultGlobalState = require('../default-global-state');

module.exports = function addReducer(name, reducer) {
  defaultGlobalState.addReducer(name, createReducer(reducer));
};
