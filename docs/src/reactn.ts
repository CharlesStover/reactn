import { addReducers, setGlobal } from 'reactn';
import { Dispatch, State } from 'reactn/default';

const INITIAL_STATE: State = {
  color: '#61DAFB',
};

setGlobal(INITIAL_STATE);

addReducers({

  setColor: (global: State, _dispatch: Dispatch, color: string) => {
    if (color !== global.color) {
      return { color };
    }
  },

});
