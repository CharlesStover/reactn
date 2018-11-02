const createReducer = require('../create-reducer');
const reducers = require('../reducers');

module.exports = function addReducer(name, reducer) {
  reducers[name] = createReducer(reducer);
};
