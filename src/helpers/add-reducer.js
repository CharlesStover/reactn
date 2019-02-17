import createReducer from '../create-reducer';

export default function addReducer(globalState, name, reducer) {
  globalState.addReducer(name, createReducer(reducer));
};
