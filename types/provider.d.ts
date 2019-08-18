import { Reducers, State } from '../default';
import Callback from './callback';
import Dispatcher, {
  ExtractArguments,
  PropertyDispatcher,
} from './dispatcher';
import Dispatchers from './dispatchers';
import NewGlobalState from './new-global-state';
import Reducer, { AdditionalReducers, PropertyReducer } from './reducer';
import { GlobalTuple, StateTuple } from './use-global';
import WithGlobal, { Getter, Setter } from './with-global';
import DispatchFunction from './dispatch-function';



type BooleanFunction = () => boolean;



export default interface ReactNProvider<
  G extends {} = State,
  R extends {} = Reducers,
> {

  addCallback(callback: Callback<G>): BooleanFunction;

  addReducer<A extends any[] = any[]>(
    name: string,
    reducer: Reducer<G, R, A>,
  ): BooleanFunction;

  addReducers(reducers: AdditionalReducers<G, R>): BooleanFunction;
  dispatch: Dispatchers<G, R>;
  dispatcherMap: DispatchFunction<G> & Dispatchers<G, R>;

  getDispatch(): Dispatchers<G, R>;

  getGlobal(): G;
  global: G;

  removeCallback(callback: Callback<G>): boolean;

  reset(): void;

  setGlobal(
    newGlobalState: NewGlobalState<G>,
    callback?: Callback<G>,
  ): Promise<G>;

  useDispatch(): Dispatchers<G, R>;
  useDispatch<A extends any[] = any[]>(
    reducer: Reducer<G, R, A>,
  ): Dispatcher<G, A>;
  useDispatch<A extends any[] = any[], P extends keyof G = keyof G>(
    reducer: PropertyReducer<G, P, A>,
    property: P,
  ): PropertyDispatcher<G, P, A>;
  useDispatch<K extends keyof R = keyof R>(
    reducer: K,
  ): Dispatcher<G, ExtractArguments<R[K]>>;

  useGlobal(): GlobalTuple<G>;
  useGlobal<Property extends keyof G>(
    property: Property,
  ): StateTuple<G, Property>;

  withGlobal<HP, LP>(
    getter?: Getter<G, R, HP, LP>,
    setter?: Setter<G, R, HP, LP>,
  ): WithGlobal<HP, LP>;

  new (props: {}, context?: any): React.Component<{}, {}>;

}
