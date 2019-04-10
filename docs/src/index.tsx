import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import './index.scss';

setGlobal({
  color: '#404040',
});

const rand = (): number =>
  Math.floor(Math.random() * 256);
setInterval((): void => {
  setGlobal({
    color: `rgb(${rand}, ${rand}, ${rand})`,
  });
}, 100);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
