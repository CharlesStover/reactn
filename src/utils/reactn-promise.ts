import GlobalStateManager from '../global-state-manager';

type ReactNPromiseCatchHandler<GS> = (err: Error) => NewGlobalState<GS>;

type ReactNPromiseThenHandler<GS> = (globalState: GS) => NewGlobalState<GS>;

export default class ReactNPromise<GS> {
  _globalStateManager: GlobalStateManager<GS>;
  _promise: Promise<NewGlobalState<GS>>;

  constructor(
    globalStateManager: GlobalStateManager<GS>,
    promise: Promise<NewGlobalState<GS>>,
  ) {
    this._globalStateManager = globalStateManager;
    this._promise = promise;
  }

  catch(listener: ReactNPromiseCatchHandler<GS>): ReactNPromise<GS> {
    return this._globalStateManager.setFunction(listener);
  }

  then(listener: ReactNPromiseThenHandler<GS>): ReactNPromise<GS> {
    return this._globalStateManager.setFunction(listener);
  }
}