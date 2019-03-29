import React = require('react');
import { ReactNComponent, ReactNPureComponent } from './components';
import ReactN from './decorator';
import defaultGlobalStateManager from './default-global-state-manager';
import GlobalStateManager, { NewGlobalState } from './global-state-manager';
import addReducer from './helpers/add-reducer';
import addReducers from './helpers/add-reducers';
import createProvider from './helpers/create-provider';
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



// useGlobal is defined as a function here to fully support its
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

const helperFunctions = {

  addCallback: <GS extends {} = {}>(
    callback: Callback<GS>
  ): BooleanFunction =>
    defaultGlobalStateManager.addCallback(callback),

  addReducer: <GS extends {} = {}>(
    name: string,
    reducer: Reducer<GS>,
  ): BooleanFunction =>
    addReducer(defaultGlobalStateManager, name, reducer),

  addReducers: <GS extends {} = {}>(
    reducers: Reducers<GS>,
  ): BooleanFunction =>
    addReducers(defaultGlobalStateManager, reducers),

  Component: ReactNComponent,

  createProvider,

  getGlobal: <GS extends {} = {}>(): GS =>
    defaultGlobalStateManager.state as GS,

  PureComponent: ReactNPureComponent,

  removeCallback: <GS extends {} = {}>(callback: Callback<GS>): boolean =>
    defaultGlobalStateManager.removeCallback(callback),

  resetGlobal: (): void =>
    defaultGlobalStateManager.reset(),

  setGlobal: <GS extends {} = {}>(
    newGlobalState: NewGlobalState<GS>,
    callback: Callback<GS> | null = null,
  ): Promise<GS> =>
    setGlobal<GS>(
      defaultGlobalStateManager as GlobalStateManager<GS>,
      newGlobalState,
      callback
    ),

  useGlobal: useGlobal,

  withGlobal: <GS extends {} = {}, HP extends {} = {}, LP extends {} = {}>(
    getter: Getter<GS, HP, LP> = (globalState: GS): GS => globalState,
    setter: WithGlobalSetter<GS, HP, LP> = () => null,
  ): WithGlobal<HP, LP> =>
    withGlobal<GS, HP, LP>(null, getter, setter)

};

export = Object.assign(ReactN, React, helperFunctions, {
  default: ReactN,
});
