import React from 'react';
import Context from '../context';
import GlobalStateManager, { NewGlobalState } from '../global-state-manager';
import Callback from '../typings/callback';
import Reducer, {
  AdditionalDispatchers,
  Dispatchers,
} from '../typings/reducer';
import addReducer from './add-reducer';
import setGlobal from './set-global';
import useGlobal, {
  GlobalTuple,
  Setter as UseGlobalSetter,
  StateTuple,
  UseGlobal,
} from './use-global';
import withGlobal, {
  Getter,
  Setter as WithGlobalSetter,
  WithGlobal,
} from './with-global';

export interface ReactNProvider<
  GS extends {} = {},
  R extends {} = {},
> {
  addCallback(callback: Callback<GS>): RemoveAddedCallback;
  addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<GS, A>,
  ): RemoveAddedReducer;
  dispatch: Dispatchers<GS, R> & AdditionalDispatchers<GS>;
  getDispatch(): Dispatchers<GS, R> & AdditionalDispatchers<GS>;
  getGlobal(): GS;
  global: GS;
  removeCallback(callback: Callback<GS>): boolean;
  reset(): void;
  setGlobal(
    newGlobalState: NewGlobalState<GS>,
    callback?: Callback<GS>,
  ): Promise<GS>;
  useGlobal(): GlobalTuple<GS>;
  useGlobal<Property extends keyof GS>(
    property: Property,
    setterOnly?: false,
  ): StateTuple<GS, Property>;
  useGlobal<Property extends keyof GS>(
    property: Property,
    setterOnly: true,
  ): UseGlobalSetter<GS, Property>;
  withGlobal<HP, LP>(
    getter: Getter<GS, HP, LP>,
    setter: WithGlobalSetter<GS, HP, LP>,
  ): WithGlobal<HP, LP>;
  new (props: {}, context?: any): React.Component<{}, {}>;
}

type RemoveAddedCallback = () => boolean;

type RemoveAddedReducer = () => boolean;

export default function createProvider<
  GS extends {} = {},
  R extends {} = {},
>(
  initialState: GS = Object.create(null),
  initialReducers: R = Object.create(null),
): ReactNProvider<GS, R> {

  const globalStateManager = new GlobalStateManager<GS, R>(
    initialState,
    initialReducers,
  );

  return class ReactNProvider extends React.Component<{}, {}> {

    public static addCallback(f: Callback<GS>): RemoveAddedCallback {
      return globalStateManager.addCallback(f);
    }

    public static addReducer<A extends any[] = any[]>(
      name: string,
      reducer: Reducer<GS, A>,
    ): RemoveAddedReducer {
      return addReducer<GS>(globalStateManager, name, reducer);
    }

    public static get dispatch(
    ): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
      return globalStateManager.dispatchers;
    }

    public static getDispatch(
    ): Dispatchers<GS, R> & AdditionalDispatchers<GS> {
      return globalStateManager.dispatchers;
    }

    public static getGlobal(): GS {
      return globalStateManager.state;
    }

    public static get global(): GS {
      return globalStateManager.state;
    }

    public static removeCallback(callback: Callback<GS>): boolean {
      return globalStateManager.removeCallback(callback);
    }

    public static reset(): void {
      return globalStateManager.reset();
    }

    public static setGlobal(
      newGlobalState: NewGlobalState<GS>,
      callback: Callback<GS> | null = null,
    ): Promise<GS> {
      return setGlobal<GS>(globalStateManager, newGlobalState, callback);
    }

    public static useGlobal(): GlobalTuple<GS>;
    public static useGlobal<Property extends keyof GS>(
      property: Property,
      setterOnly?: false,
    ): StateTuple<GS, Property>;
    public static useGlobal<Property extends keyof GS>(
      property: Property,
      setterOnly: true,
    ): UseGlobalSetter<GS, Property>;
    public static useGlobal<Property extends keyof GS>(
      property?: Property,
      setterOnly: boolean = false,
    ): UseGlobal<GS, Property> {
      return useGlobal(
        globalStateManager,
        property,
        // @ts-ignore-next-line: Argument of type 'boolean' is not assignable to parameter of type 'true'.
        setterOnly,
      );
    }

    public static withGlobal<HP, LP>(
      getter: Getter<GS, HP, LP> = (globalState: GS): GS => globalState,
      setter: WithGlobalSetter<GS, HP, LP> = (): null => null,
    ): WithGlobal<HP, LP> {
      return withGlobal<GS, HP, LP>(globalStateManager, getter, setter);
    }

    public render(): JSX.Element {
      return (
        <Context.Provider value={globalStateManager}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
}
