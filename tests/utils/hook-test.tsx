import * as React from 'react';
import { render } from 'react-testing-library';

export default class HookTest<P extends any[] = any[], R extends any = any> {

  private _error: Error = null;
  private _hook: (...args: P) => R;
  private _renders: number = 0;
  private _value: R;

  constructor(hook: (...args: P) => R) {
    this._hook = hook;
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
    render(
      <this.ErrorBoundary>
        <TestComponent />
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
