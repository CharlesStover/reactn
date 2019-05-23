import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import App from './components/app';
import './index.scss';
import './reactn';

addReactNDevTools();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
