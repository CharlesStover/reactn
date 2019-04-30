import React, { useDispatch } from 'reactn';

export default function Install() {
  const setColor = useDispatch('setColor');
  setColor('#FF0000');
  return <>
    <code>yarn add reactn</code>
  </>;
}
