import createReducer from '../create-reducer';
import defaultGlobalState from '../default-global-state';

export default function addReducer(name, reducer) {
  defaultGlobalState.addReducer(name, createReducer(reducer));
};
