import React, { useGlobal } from 'reactn';
import './app-navigation.scss';
import ListItem from './list-item';



type Page = [ string, string ];



const PAGES: { [key: string]: Page[] } = {
  API: [
    [ 'addCallback', 'addCallback' ],
    [ 'addReducer', 'addReducer' ],
    [ 'createProvider', 'createProvider' ],
    [ 'getGlobal', 'getGlobal' ],
    [ 'setGlobal', 'setGlobal' ],
    [ 'useGlobal', 'useGlobal' ],
    [ 'useGlobalReducer', 'useGlobalReducer' ],
    [ 'withGlobal', 'withGlobal' ],
  ],
  EXAMPLES: [
    [ 'async-example', 'Asynchronous' ],
    [ 'counter-example', 'Counter' ],
    [ 'shopping-cart-example', 'Shopping Cart' ],
    [ 'todo-example', 'TODO' ],
  ],
  GETTING_STARTED: [
    [ 'install', 'Installation' ],
  ],
};



export default function AppNavigation() {
  const [ backgroundColor ] = useGlobal('rainbow');
  return (
    <nav
      className="app-navigation"
      style={{ backgroundColor }}
    >
      <ul>
        <ListItem to="">
          About
        </ListItem>
        <ListItem pages={PAGES.GETTING_STARTED}>
          Getting Started
        </ListItem>
        <ListItem pages={PAGES.API}>
          API
        </ListItem>
        <ListItem pages={PAGES.EXAMPLES}>
          Examples
        </ListItem>
        <ListItem to="support">
          Support
        </ListItem>
      </ul>
    </nav>
  );
}
