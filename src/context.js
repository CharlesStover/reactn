const { createContext } = require('react');
const GlobalState = require('./global-state');

module.exports = createContext(new GlobalState());
