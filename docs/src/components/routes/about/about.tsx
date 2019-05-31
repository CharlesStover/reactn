import React, { useGlobal } from 'reactn';
import './about.scss';

export default function About() {
  const [ color, setColor ] = useGlobal('color');
  setColor('#61DAFB');
  return <>
    <p>
      <strong>ReactN</strong> is a global state management solution for{' '}
      <strong>ReactJS</strong>.
    </p>
    <p>
      <strong>ReactN</strong> follows the design philosophy,
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
    </p>
  </>;
}
