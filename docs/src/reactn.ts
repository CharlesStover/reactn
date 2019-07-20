import { addReducer, setGlobal } from 'reactn';
import { State } from 'reactn/default';

const INITIAL_STATE: State = {
  color: '#61DAFB',
};

setGlobal(INITIAL_STATE);

addReducer('setColor', (global, _dispatch, color) => {
  if (color !== global.color) {
    return { color };
  }
});
