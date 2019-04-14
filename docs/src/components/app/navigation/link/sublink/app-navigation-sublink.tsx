import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import useReactRouter from 'use-react-router';
import './app-navigation-sublink.scss';



interface G {
  rainbow: string;
}

interface Props {
  children: string;
  to: string;
}



export default function AppNavigationLink(
  { children, to }: Props
): JSX.Element {
  const [ global ] = useGlobal<G>();
  const { location } = useReactRouter();
  if (location.pathname.substring(1) === to) {
    return (
      <li
        className="app-navigation-sublink app-navigation-sublink-selected"
        style={{ color: global.rainbow }}
      >
        ⮞ {children}
      </li>
    );
  }
  return (
    <li className="app-navigation-sublink">
      <Link
        title={`${children} - ReactN Documentation`}
        to={`/${to}`}
      >
        {children}
      </Link>
    </li>
  );
}
