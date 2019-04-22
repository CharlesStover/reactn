import { Route, Switch } from 'react-router-dom';
import React from 'reactn';
import About from '../routes/about';
import AddCallback from '../routes/add-callback';
import AddReducer from '../routes/add-reducer';
import CreateProvider from '../routes/create-provider';
import GetGlobal from '../routes/get-global';
import SetGlobal from '../routes/set-global';
import UseGlobal from '../routes/use-global';
import UseGlobalReducer from '../routes/use-global-reducer';
import WithGlobal from '../routes/with-global';
import Support from '../routes/support';
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
            {/* Getting Started */}
            <Route
              component={Install}
              path="/install"
            />

            {/* API */}
            <Route
              component={AddCallback}
              path="/addCallback"
            />
            <Route
              component={AddReducer}
              path="/addReducer"
            />
            <Route
              component={CreateProvider}
              path="/createProvider"
            />
            <Route
              component={GetGlobal}
              path="/getGlobal"
            />
            <Route
              component={SetGlobal}
              path="/setGlobal"
            />
            <Route
              component={UseGlobal}
              path="/useGlobal"
            />
            <Route
              component={UseGlobalReducer}
              path="/useGlobalReducer"
            />
            <Route
              component={WithGlobal}
              path="/withGlobal"
            />

            {/* Support */}
            <Route
              component={Support}
              path="/support"
            />

            {/* Default */}
            <Route component={About} />
          </Switch>
        </main>
        <Navigation />
      </div>
    </div>
  );
}
