import React, { useGlobal } from 'reactn';

export default function Install() {
  const [ rainbow, setRainbow ] = useGlobal('rainbow');
  if (rainbow !== '#FF0000') {
    setRainbow('#FF0000');
    return null;
  }
  return <>
    <code>yarn add reactn</code>
  </>;
}
