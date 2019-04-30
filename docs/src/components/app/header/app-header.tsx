import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import './app-header.scss';
import GitHubBanner from './github-banner';
import ReactLogo from './react-logo';



export default function AppHeader() {
  const [ color ] = useGlobal('color');
  return (
    <header
      className="app-header"
      style={{
        backgroundColor: color,
      }}
    >
      <div>
        <h1>
          <Link
            title="ReactN Documentation"
            to="/"
          >
            React
            <ReactLogo
              className="app-header-react-logo"
              fill={color}
            />
            N
          </Link>
        </h1>
      </div>
      <GitHubBanner />
    </header>
  );
}
