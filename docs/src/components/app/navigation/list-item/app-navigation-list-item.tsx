import { Link } from 'react-router-dom';
import React, { useGlobal } from 'reactn';
import useReactRouter from 'use-react-router';
import './app-navigation-list-item.scss';



type Page = [ string, string ];

interface PropsMultiple {
  children: JSX.Element | string;
  pages: Page[];
}

interface PropsSingle {
  children: JSX.Element | string;
  to: string;
}



const CLASS_NAME = 'app-navigation-list-item';

const SELECTED_CLASS_NAME = `${CLASS_NAME} ${CLASS_NAME}-selected`;

const SUBLINK_CLASS_NAME = 'app-navigation-list-item-sublink';

const SUBLINK_SELECTED_CLASS_NAME =
  `${SUBLINK_CLASS_NAME} ${SUBLINK_CLASS_NAME}-selected`;

const hasPages = (
  props: PropsSingle | PropsMultiple,
): props is PropsMultiple => {
  return Object.prototype.hasOwnProperty.call(props, 'pages');
};

const isPageSelected = (pages: Page[], pathname: string): boolean =>
  pages.reduce(
    (selected: boolean, [ url ]: Page): boolean =>
      selected ||
      pathname.substring(1) === url,
    false
  );



export default function AppNavigationListItem(
  props: PropsMultiple | PropsSingle
): JSX.Element {
  const [ global ] = useGlobal();
  const { location } = useReactRouter();

  // If this category has children,
  if (hasPages(props)) {
    const selected = isPageSelected(props.pages, location.pathname);
    return (
      <div className={selected ? SELECTED_CLASS_NAME : CLASS_NAME}>
        <strong>{props.children}</strong>
        <ul>
          {
            props.pages.map(([ url, title ]): JSX.Element => {
              if (location.pathname.substring(1) === url) {
                return (
                  <li
                    className={SUBLINK_SELECTED_CLASS_NAME}
                    style={{ color: global.rainbow }}
                  >
                    ⮞ {title}
                  </li>
                );
              }
              return (
                <li className={SUBLINK_CLASS_NAME}>
                  <Link
                    title={`${title} - ReactN Documentation`}
                    to={`/${url}`}
                  >
                    {title}
                  </Link>
                </li>
              );
            
            })
          }
        </ul>
      </div>
    );
  }

  // If this category is a link, and the user is at this location,
  if (location.pathname.substring(1) === props.to) {
    return (
      <div className={SELECTED_CLASS_NAME}>
        <strong style={{ color: global.rainbow }}>⮞ {props.children}</strong>
      </div>
    );
  }

  // If this category is a link, and the user is not at this location,
  return (
    <div className={CLASS_NAME}>
      <strong>
        <Link
          title={`${props.children} - ReactN Documentation`}
          to={`/${props.to}`}
        >
          {props.children}
        </Link>
      </strong>
    </div>
  );
}
