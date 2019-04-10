import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import GitHubBanner from '../github-banner';
import './header.scss';



interface G {
  rainbow: string;
}



export default function Header() {
  const [ backgroundColor ] = useGlobal<G>('rainbow');
  return (
    <header
      className="header"
      style={{
        backgroundColor,
      }}
    >
      <div>
        <h1>
          <Link title="ReactN Documentation" to="/">
            React
            <span>N</span>
          </Link>
        </h1>
      </div>
      <GitHubBanner />
    </header>
  );
}
