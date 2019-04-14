import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import GitHubBanner from './github-banner';
import './header.scss';
import ReactLogo from './react-logo';



interface G {
  rainbow: string;
}



export default function Header() {
  const [ color ] = useGlobal<G>('rainbow');
  return (
    <header
      className="header"
      style={{
        backgroundColor: color,
      }}
    >
      <div>
        <h1>
          <Link title="ReactN Documentation" to="/">
            React
            <ReactLogo
              className="header-react-logo"
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
