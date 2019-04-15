import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import './index.scss';

setGlobal({
  rainbow: '#61DAFB',
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
