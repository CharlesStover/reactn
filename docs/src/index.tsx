import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import './index.scss';

const rand = (): number =>
  Math.floor(Math.random() * 256);

const rainbowify = () =>
  setGlobal({
    rainbow: `rgb(${rand()}, ${rand()}, ${rand()})`,
  });

rainbowify().then((): void => {
  setTimeout(rainbowify, 0);
  setInterval(rainbowify, 30000);
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
