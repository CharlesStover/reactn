import GlobalStateManager, { NewGlobalState } from '../global-state-manager';

type ReactNPromiseCatchHandler<GS> = (err: Error) => NewGlobalState<GS>;

type ReactNPromiseThenHandler<GS> = (globalState: GS) => NewGlobalState<GS>;

export default class ReactNPromise<GS> {
  private _globalStateManager: GlobalStateManager<GS>;
  private _promise: Promise<NewGlobalState<GS>>;

  public constructor(
    globalStateManager: GlobalStateManager<GS>,
    promise: Promise<NewGlobalState<GS>>,
  ) {
    this._globalStateManager = globalStateManager;
    this._promise = promise;
  }

  public catch(listener: ReactNPromiseCatchHandler<GS>): ReactNPromise<GS> {
    return this._globalStateManager.setFunction(listener);
  }

  public then(listener: ReactNPromiseThenHandler<GS>): ReactNPromise<GS> {
    return this._globalStateManager.setFunction(listener);
  }
}