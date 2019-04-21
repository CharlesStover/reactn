import { Route, Switch } from 'react-router-dom';
import React from 'reactn';
import About from '../routes/about';
import AddCallback from '../routes/add-callback';
import AddReducer from '../routes/add-reducer';
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
              component={AddCallback}
              path="/addCallback"
            />
            <Route
              component={AddReducer}
              path="/addReducer"
            />
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
