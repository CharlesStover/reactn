import { act, render } from '@testing-library/react';
import * as React from 'react';

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

  public constructor(hook: (...args: P) => R) {
    this._hook = hook;
  }

  public addParent<P extends {} = {}>(Component: React.ComponentClass<P>, props?: P): this {
    this._parents.push({
      Component,
      props,
    });
    return this;
  }

  public get error(): Error {
    return this._error;
  }

  private get ErrorBoundary(): React.ComponentClass<{}, {}> {
    const self: HookTest = this;
    return class HookTestErrorBoundary extends React.Component<{}, {}> {

      public componentDidCatch(error: Error) {
        self._error = error;
      }

      public render() {
        return this.props.children;
      }
    };
  }

  public render(...args: P): this {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    act((): void => {
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
    });
    (console.error as jest.Mock).mockRestore();
    return this;
  }

  public get renders(): number {
    return this._renders;
  }

  private TestComponent(...args: P): React.FunctionComponent<{}> {
    const HookTestComponent = () => {
      this._renders++;
      this._value = this._hook(...args);
      return null;
    };
    return HookTestComponent;
  }

  public get value(): R {
    return this._value;
  }
}
