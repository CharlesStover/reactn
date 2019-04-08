import { Component } from 'react';
import { cleanup } from 'react-testing-library';
import { ReactNComponent, ReactNPureComponent } from '../../src/components';
import reactn, { addReducers, setGlobal } from '../../build/index';
import { GS, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import testComponentWillUnmount from './component-will-unmount';
import testComponentWillUpdate from './component-will-update';
import testMount from './mount';
import Props from './props';



type VoidFunction = () => void;



const testComponent = (
  _Super: typeof ReactNComponent,
): VoidFunction => (): void => {
  
  // componentWillUnmount (prototype)
  const spyUnmountPrototype = jest.fn();
  testComponentWillUnmount(reactn(
    class TestUnmountPrototype extends _Super<Props, {}> {
      componentWillUnmount() { spyUnmountPrototype(); }
      render() { return null; }
    }),
    spyUnmountPrototype,
  );

  // componentWillUnmount (instance)
  const spyUnmountInstance = jest.fn();
  testComponentWillUnmount(reactn(
    class TestUnmountInstance extends _Super<Props, {}> {
      componentWillUnmount = spyUnmountInstance;
      render() { return null; }
    }),
    spyUnmountInstance,
  );

  // componentWillUpdate (prototype)
  const spyUpdatePrototype = jest.fn();
  testComponentWillUpdate(reactn(
    class TestUpdatePrototype extends _Super<Props, {}, GS, R> {
      componentWillUpdate() { spyUpdatePrototype(); }
      render() { return null; }
    }),
    spyUpdatePrototype,
  );

  // componentWillUpdate (instance)
  /*
  const spyUpdateInstance = jest.fn();
  testComponentWillUpdate(
    class TestCwuInstance extends _Super<Props, {}, GS, R> {
      componentWillUpdate = spyUpdateInstance;
      render() { return null; }
    },
    spyUpdateInstance,
  );
  */

  testMount(class TestMount extends _Super<Props, {}, GS, R> {
    render() { return null; }
  });

  it.skip('should do more', (): void => {
  });
};



describe('Components', (): void => {

  beforeEach((): void => {
    addReducers(INITIAL_REDUCERS);
    setGlobal(INITIAL_STATE);
  });

  afterEach(cleanup);



  describe('decorated', (): void => {
  
    // componentWillUnmount (prototype)
    const spyUnmountPrototype = jest.fn();
    testComponentWillUnmount(reactn(
      class DecoratedCwuPrototype extends Component<Props, {}> {
        componentWillUnmount() { spyUnmountPrototype(); }
        render() { return null; }
      }),
      spyUnmountPrototype,
    );

    // componentWillUnmount (instance)
    const spyUnmountInstance = jest.fn();
    testComponentWillUnmount(reactn(
      class DecoratedCwuInstance extends Component<Props, {}> {
        componentWillUnmount = spyUnmountInstance;
        render() { return null; }
      }),
      spyUnmountInstance,
    );
  
    // componentWillUpdate (prototype)
    const spyUpdatePrototype = jest.fn();
    testComponentWillUpdate(reactn(
      class DecoratedCwuPrototype extends Component<Props, {}> {
        componentWillUpdate() { spyUpdatePrototype(); }
        render() { return null; }
      }),
      spyUpdatePrototype,
    );

    // componentWillUpdate (instance)
    const spyUpdateInstance = jest.fn();
    testComponentWillUpdate(reactn(
      class DecoratedCwuInstance extends Component<Props, {}> {
        componentWillUpdate = spyUpdateInstance;
        render() { return null; }
      }),
      spyUpdateInstance,
    );
  
    testMount(reactn(
      class DecoratedMount extends Component<Props, {}> {
        render() { return null; }
      }
    ));
  });



  describe('ReactNComponent', testComponent(ReactNComponent));

  describe('ReactNPureComponent', testComponent(ReactNPureComponent));

});
