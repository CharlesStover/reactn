import React, { useDispatch, withGlobal } from 'reactn';
import './about.scss';

interface Props {
  color: string;
}

export default withGlobal(
  ({ color }) => ({ color }),
)(
  function About({ color }) {
    const setColor = useDispatch('setColor');
    setColor('#61DAFB');
    return <>
      <p>
        <strong>ReactN</strong> is a global state management solution for{' '}
        <strong>ReactJS</strong>.
      </p>
      <p>
        <strong>ReactN</strong> adheres to the following design philosophy,
      </p>
      <blockquote
        className="about-blockquote"
        style={{ color }}
      >
        What if global state management were built into React itself?
      </blockquote>
      <ul>
        <li>
          How convenient can we make global state management if we remove the
          boilerplate of third party libraries?
        </li>
        <li>
          What if the global state API followed the same style and guidelines
          as the React local state API?
        </li>
      </ul>
    </>;
  },
);
