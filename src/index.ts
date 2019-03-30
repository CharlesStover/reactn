import React = require('react');
import { ReactNComponent, ReactNPureComponent } from './components';
import reactn from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import { NewGlobalState } from './global-state-manager';
import addCallback from './helpers/add-callback';
import addReducer from './helpers/add-reducer';
import addReducers from './helpers/add-reducers';
import createProvider from './helpers/create-provider';
import getGlobal from './helpers/get-global';
import removeCallback from './helpers/remove-callback';
import resetGlobal from './helpers/reset-global';
import setGlobal from './helpers/set-global';
import useGlobalHelper, {
  GlobalTuple,
  Setter as UseGlobalSetter,
  StateTuple,
  UseGlobal,
} from './helpers/use-global';
import withGlobal, {
  Getter,
  Setter as WithGlobalSetter,
  WithGlobal,
} from './helpers/with-global';
import Callback from './typings/callback';
import Reducer, { Reducers } from './typings/reducer';



type BooleanFunction = () => boolean;

type Decorator = typeof reactn;

interface ReactN extends Decorator {
  addCallback<GS extends {} = {}>(callback: Callback<GS>): BooleanFunction;
  addReducer<GS extends {} = {}>(
    name: string,
    reducer: Reducer<GS>,
  ): BooleanFunction,
  addReducers<GS extends {} = {}>(reducers: Reducers<GS>): BooleanFunction;
  Component: typeof ReactNComponent,
  createProvider: typeof createProvider,
  default: ReactN;
  getGlobal<GS extends {} = {}>(): GS;
  PureComponent: typeof ReactNPureComponent,
  removeCallback<GS extends {} = {}>(callback: Callback<GS>): boolean;
  resetGlobal(): void;
  setGlobal<GS extends {} = {}>(
    newGlobalState: NewGlobalState<GS>,
    callback?: Callback<GS>,
  ): Promise<GS>;
  useGlobal: typeof useGlobal;
  withGlobal<GS extends {} = {}, HP extends {} = {}, LP extends {} = {}>(
    getter?: Getter<GS, HP, LP>,
    setter?: WithGlobalSetter<GS, HP, LP>,
  ): WithGlobal<HP, LP>;
}



// useGlobal is defined as a function here to fully support its overloading.
function useGlobal<GS extends {} = {}>(): GlobalTuple<GS>;
function useGlobal<GS extends {}, Property extends keyof GS>(
  property: Property,
  setterOnly?: false,
): StateTuple<GS, Property>;
function useGlobal<GS extends {}, Property extends keyof GS>(
  property: Property,
  setterOnly: true,
): UseGlobalSetter<GS, Property>;
function useGlobal<GS extends {}, Property extends keyof GS>(
  property?: Property,
  setterOnly: boolean = false,
): UseGlobal<GS, Property> {
  return useGlobalHelper<GS, Property>(
    null,
    property,
    // @ts-ignore-next-line:
    //   Argument of type 'boolean' is not assignable to parameter of type
    //   'true'.
    setterOnly,
  );
}

// TODO: Fix "as any as ReactN"
//   It should just work without "as" anything.
export = Object.assign(reactn, React, {
  addCallback: addCallback.bind(null, defaultGlobalStateManager),
  addReducer: addReducer.bind(null, defaultGlobalStateManager),
  addReducers: addReducers.bind(null, defaultGlobalStateManager),
  Component: ReactNComponent,
  createProvider,
  default: reactn,
  getGlobal: getGlobal.bind(null, defaultGlobalStateManager),
  PureComponent: ReactNPureComponent,
  removeCallback: removeCallback.bind(null, defaultGlobalStateManager),
  resetGlobal: resetGlobal.bind(null, defaultGlobalStateManager),
  setGlobal: setGlobal.bind(null, defaultGlobalStateManager),
  useGlobal: useGlobal,
  withGlobal: withGlobal.bind(null, null),
}) as any as ReactN;
