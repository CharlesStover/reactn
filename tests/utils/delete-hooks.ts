import * as React from 'react';



export default (): void => {

  let useCallback: typeof React.useCallback;
  let useContext: typeof React.useContext;
  let useDebugValue: typeof React.useDebugValue;
  let useEffect: typeof React.useEffect;
  let useImperativeHandle: typeof React.useImperativeHandle;
  let useMemo: typeof React.useMemo;
  let useReducer: typeof React.useReducer;
  let useRef: typeof React.useRef;
  let useState: typeof React.useState;
  let useLayoutEffect: typeof React.useLayoutEffect;

  beforeEach((): void => {

    useCallback = React.useCallback;
    delete React.useCallback;

    useContext = React.useContext;
    delete React.useContext;

    useDebugValue = React.useDebugValue;
    delete React.useDebugValue;

    useEffect = React.useEffect;
    delete React.useEffect;

    useImperativeHandle = React.useImperativeHandle;
    delete React.useImperativeHandle;

    useLayoutEffect = React.useLayoutEffect;
    delete React.useLayoutEffect;

    useMemo = React.useMemo;
    delete React.useMemo;

    useReducer = React.useReducer;
    delete React.useReducer;

    useRef = React.useRef;
    delete React.useRef;

    useState = React.useState;
    delete React.useState;
  });

  afterEach((): void => {

    // @ts-ignore: Cannot assign to 'useCallback' because it is a read-only
    //   property.
    React.useCallback = useCallback;

    // @ts-ignore: Cannot assign to 'useContext' because it is a read-only
    //   property.
    React.useContext = useContext;

    // @ts-ignore: Cannot assign to 'useDebugValue' because it is a read-only
    //   property.
    React.useDebugValue = useDebugValue;

    // @ts-ignore: Cannot assign to 'useEffect' because it is a read-only
    //   property.
    React.useEffect = useEffect;

    // @ts-ignore: Cannot assign to 'useImperativeHandle' because it is a
    //   read-only property.
    React.useImperativeHandle = useImperativeHandle;

    // @ts-ignore: Cannot assign to 'useLayoutEffect' because it is a read-only
    //   property.
    React.useLayoutEffect = useLayoutEffect;

    // @ts-ignore: Cannot assign to 'useMemo' because it is a read-only
    //   property.
    React.useMemo = useMemo;

    // @ts-ignore: Cannot assign to 'useReducer' because it is a read-only
    //   property.
    React.useReducer = useReducer;

    // @ts-ignore: Cannot assign to 'useRef' because it is a read-only
    //   property.
    React.useRef = useRef;

    // @ts-ignore: Cannot assign to 'useState' because it is a read-only
    //   property.
    React.useState = useState;
  });
};
