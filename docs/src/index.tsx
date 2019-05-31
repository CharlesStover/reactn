import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import App from './components/app';
import './index.scss';
import './reactn';

type TypeOfModule = typeof module;

interface HotNodeModule extends TypeOfModule {
  hot?: {
    accept(): void;
  }
}

addReactNDevTools();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

const m: HotNodeModule = module;
if (m.hot) {
  m.hot.accept();
}
