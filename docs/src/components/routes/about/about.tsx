import React, { useDispatch } from 'reactn';

export default function About() {
  const setColor = useDispatch('setColor');
  setColor('#61DAFB');
  return <>
    <strong>ReactN</strong>{' '}
    is a global state management solution for{' '}
    <strong>ReactJS</strong>.
  </>;
}
