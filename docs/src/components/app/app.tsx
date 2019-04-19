import { Route, Switch } from 'react-router-dom';
import React from 'reactn';
import About from '../routes/about';
import Install from '../routes/install';
import './app.scss';
import Header from './header';
import Navigation from './navigation';



export default function App() {
  return (
    <div className="app">
      <Header />
      <div>
        <main>
          <Switch>
            <Route
              component={Install}
              path="/install"
            />
            <Route component={About} />
          </Switch>
        </main>
        <Navigation />
      </div>
    </div>
  );
}
