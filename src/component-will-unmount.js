import { removeListeners } from './global-state-manager';

const componentWillUnmount = function() {
  removeListeners(this);
};

export default componentWillUnmount;
