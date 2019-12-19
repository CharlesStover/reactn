import { Component } from 'react';
import addReducers from '../../src/add-reducers';
import { ReactNComponent, ReactNPureComponent } from '../../src/components';
import reactn from '../../src/decorator';
import defaultGlobalStateManager from '../../src/default-global-state-manager';
import resetGlobal from '../../src/reset-global';
import setGlobal from '../../src/set-global';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from '../utils/initial';
import testComponentWillUnmount from './component-will-unmount';
import testShouldComponentUpdate from './should-component-update';
import testMount from './mount';
import Props from './props';



type VoidFunction = () => void;



const testComponent = (
  _Super: typeof ReactNComponent,
): VoidFunction => (): void => {

  testMount(
    class TestMount extends _Super<Props, {}, G, R> {
      public render(): null { return null; }
    }
  );
  
  // componentWillUnmount (prototype)
  const spyUnmountPrototype = jest.fn();
  testComponentWillUnmount(
    'prototype',
    class TestUnmountPrototype extends _Super {
      public componentWillUnmount(): void { spyUnmountPrototype(); }
      public render(): null { return null; }
    },
    spyUnmountPrototype,
  );

  // componentWillUnmount (instance)
  /**
   * componentWillUnmount (instance)
   * Does not work because the Component calling
   *   this.componentWillUnmount = () => { } in its constructor will override
   *   the componentWillUnmount on its prototype that is set by the ReactN
   *   Component class.
   * The Component's constructor executes after the ReactN Component's
   *   constructor, so ReactN cannot mutate the one set by the developer.
   * 
  const spyUnmountInstance = jest.fn();
  testComponentWillUnmount(
    'instance',
    class TestUnmountInstance extends _Super {
      componentWillUnmount = spyUnmountInstance;
      render() { return null; }
    },
    spyUnmountInstance,
  );
  */

  // shouldComponentUpdate (prototype)
  const spyUpdatePrototype = jest.fn();
  testShouldComponentUpdate(
    'prototype',
    class TestUpdatePrototype extends _Super<Props, {}, G, R> {
      public shouldComponentUpdate(): boolean { return spyUpdatePrototype(); }
      public render(): null { return null; }
    },
    spyUpdatePrototype,
  );

  /**
   * shouldComponentUpdate (instance)
   * Does not work because the Component calling
   *   this.shouldComponentUpdate = () => { } in its constructor will override
   *   the shouldComponentUpdate on its prototype that is set by the ReactN
   *   Component class.
   * The Component's constructor executes after the ReactN Component's
   *   constructor, so ReactN cannot mutate the one set by the developer.
   * 
  const spyUpdateInstance = jest.fn();
  testShouldComponentUpdate(
    'instance',
    class TestCwuInstance extends _Super<Props, {}, G, R> {
      shouldComponentUpdate = spyUpdateInstance;
      render() { return null; }
    },
    spyUpdateInstance,
  );
  */

  it.skip('should do more', (): void => {
  });
};



describe('Components', (): void => {

  beforeEach((): void => {
    addReducers(defaultGlobalStateManager, INITIAL_REDUCERS);
    setGlobal(defaultGlobalStateManager, INITIAL_STATE);
  });

  afterEach((): void => {
    resetGlobal(defaultGlobalStateManager);
  });



  describe('decorated', (): void => {
  
    testMount(
      reactn(
        class DecoratedMount extends Component<Props, {}> {
          public render(): null { return null; }
        }
      )
    );
  
    // componentWillUnmount (prototype)
    const spyUnmountPrototype = jest.fn();
    testComponentWillUnmount(
      'prototype',
      reactn(
        class DecoratedCwuPrototype extends Component {
          public componentWillUnmount(): void { spyUnmountPrototype(); }
          public render(): null { return null; }
        }
      ),
      spyUnmountPrototype,
    );

    /**
     * componentWillUnmount (instance)
     * Does not work because the extended Component calling
     *   this.componentWillUnmount = () => { } in its constructor will override
     *   the componentWillUnmount on its prototype that is set by the
     *   decorator.
     * This can be fixed by setting componentWillUnmount as a method on the
     *   instance in the decorator's constructor.
     * This is lower priority, since it isn't even supported by non-decorated
     *   ReactN Components, so ommitted to keep their features in sync.
     *
    const spyUnmountInstance = jest.fn();
    testComponentWillUnmount(
      'instance',
      reactn(
        class DecoratedCwuInstance extends Component {
          componentWillUnmount = spyUnmountInstance;
          render() { return null; }
        }
      ),
      spyUnmountInstance,
    );
    */
  
    // shouldComponentUpdate (prototype)
    const spyUpdatePrototype = jest.fn();
    testShouldComponentUpdate(
      'prototype',
      reactn(
        class DecoratedCwuPrototype extends Component<Props, {}> {
          public shouldComponentUpdate(): boolean { return spyUpdatePrototype(); }
          public render(): null { return null; }
        }
      ),
      spyUpdatePrototype,
    );

    /**
     * shouldComponentUpdate (instance)
     * Does not work because the extended Component calling
     *   this.shouldComponentUpdate = () => { } in its constructor will
     *   override the shouldComponentUpdate on its prototype that is set by
     *   the decorator.
     * This can be fixed by setting shouldComponentUpdate as a method on the
     *   instance in the decorator's constructor.
     * This is lower priority, since it isn't even supported by non-decorated
     *   ReactN Components, so ommitted to keep their features in sync.
     * 
    const spyUpdateInstance = jest.fn();
    testShouldComponentUpdate(
      'instance',
      reactn(
        class DecoratedCwuInstance extends Component<Props, {}> {
          shouldComponentUpdate = spyUpdateInstance;
          render() { return null; }
        }
      ),
      spyUpdateInstance,
    );
    */
  });



  describe('ReactNComponent', testComponent(ReactNComponent));

  describe('ReactNPureComponent', testComponent(ReactNPureComponent));

});
