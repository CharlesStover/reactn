import React, { useGlobal } from 'reactn';

export default function About() {
  const [ rainbow, setRainbow ] = useGlobal('rainbow');
  if (rainbow !== '#61DAFB') {
    setRainbow('#61DAFB');
    return null;
  }
  return <>
    <strong>ReactN</strong>{' '}
    is a global state management solution for{' '}
    <strong>ReactJS</strong>.
  </>;
}
