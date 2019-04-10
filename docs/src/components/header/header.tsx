import { Link } from 'react-router-dom';
import React from 'reactn';
import GitHubBanner from '../github-banner';
import './header.scss';



interface G {
  color: string;
}



export default class Header extends React.Component<{}, {}, G> {
  render() {
    return (
      <header
        className="header"
        style={{
          backgroundImage:
            `linear-gradient(to right, #202020, ${this.global.color}, #202020)`
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
}
