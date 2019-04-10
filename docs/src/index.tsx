import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.scss';

setGlobal({
  name: 'ReactN',
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
