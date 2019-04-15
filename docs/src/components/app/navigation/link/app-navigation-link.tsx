import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import useReactRouter from 'use-react-router';
import './app-navigation-link.scss';



interface Props {
  children?: JSX.Element | JSX.Element[];
  to?: string;
  title: string;
}



export default function AppNavigationLink(
  { children, title, to }: Props
): JSX.Element {
  const [ global ] = useGlobal();
  const { location } = useReactRouter();

  // If the user is on this page,
  if (
    typeof to === 'undefined' ||
    location.pathname.substring(1) === to
  ) {

    // If there are sublinks,
    if (children) {
      return (
        <div className="app-navigation-link">
          <strong>{title}</strong>
          <ul>{children}</ul>
        </div>
      );
    }

    // If there are not sublinks,
    return (
      <div className="app-navigation-link">
        <strong style={{ color: global.rainbow }}>⮞ {title}</strong>
      </div>
    );
  }

  // If the user is not on this page,
  return (
    <div className="app-navigation-link">
      <strong>
        <Link
          title={`${title} - ReactN Documentation`}
          to={`/${to}`}
        >
          {title}
        </Link>
      </strong>
      {
        children &&
        <ul>{children}</ul>
      }
    </div>
  );
}
