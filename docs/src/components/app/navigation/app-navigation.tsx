import React, { useGlobal } from 'reactn';
import './app-navigation.scss';
import Link, { Sublink } from './link';



export default function AppNavigation() {
  const [ backgroundColor ] = useGlobal('rainbow');
  return (
    <nav
      className="app-navigation"
      style={{ backgroundColor }}
    >
      <ul>
        <li>
          <Link
            title="About"
            to=""
          />
        </li>
        <li>
          <Link title="Getting Started">
            <Sublink to="install">Installation</Sublink>
          </Link>
        </li>
        <li>
          <Link title="API">
            <Sublink to="addCallback">addCallback</Sublink>
            <Sublink to="addReducer">addReducer</Sublink>
            <Sublink to="createProvider">createProvider</Sublink>
            <Sublink to="getGlobal">getGlobal</Sublink>
            <Sublink to="setGlobal">setGlobal</Sublink>
            <Sublink to="useGlobal">useGlobal</Sublink>
            <Sublink to="useGlobalReducer">useGlobalReducer</Sublink>
            <Sublink to="withGlobal">withGlobal</Sublink>
          </Link>
        </li>
        <li>
          <Link title="Examples">
            <Sublink to="async-example">Asynchronous</Sublink>
            <Sublink to="counter-example">Counter</Sublink>
            <Sublink to="shopping-cart-example">Shopping Cart</Sublink>
            <Sublink to="todo-example">TODO</Sublink>
          </Link>
        </li>
        <li>
          <Link
            title="Support"
            to="support"
          />
        </li>
      </ul>
    </nav>
  );
}
