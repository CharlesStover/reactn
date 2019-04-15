import * as React from 'react';
import { render } from 'react-testing-library';

interface Parent<P> {
  Component: React.ComponentClass<P, any>;
  props?: P;
}

export default class HookTest<P extends any[] = any[], R extends any = any> {

  private _error: Error = null;
  private _hook: (...args: P) => R;
  private _parents: Parent<any>[] = [];
  private _renders: number = 0;
  private _value: R;

  constructor(hook: (...args: P) => R) {
    this._hook = hook;
  }

  addParent<P extends {} = {}>(Component: React.ComponentClass<P>, props?: P): this {
    this._parents.push({
      Component,
      props,
    });
    return this;
  }

  get error(): Error {
    return this._error;
  }

  get ErrorBoundary(): React.ComponentClass<{}, {}> {
    const self: HookTest = this;
    return class HookTestErrorBoundary extends React.Component<{}, {}> {

      componentDidCatch(error: Error) {
        self._error = error;
      }

      render() {
        return this.props.children;
      }
    };
  }

  render(...args: P): this {
    const TestComponent = this.TestComponent(...args);
    const children: JSX.Element = this._parents.reduce(
      (child: JSX.Element, parent: Parent<any>): JSX.Element =>
        <parent.Component {...parent.props}>
          {child}
        </parent.Component>,
      <TestComponent />
    );
    render(
      <this.ErrorBoundary>
        {children}
      </this.ErrorBoundary>
    );
    return this;
  }

  get renders(): number {
    return this._renders;
  }

  TestComponent(...args: P): React.FunctionComponent<{}> {
    const HookTestComponent = () => {
      this._renders++;
      this._value = this._hook(...args);
      return null;
    };
    return HookTestComponent;
  }

  get value(): R {
    return this._value;
  }
}
