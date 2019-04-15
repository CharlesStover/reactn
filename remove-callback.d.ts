import { State } from '../default';
import GlobalStateManager from './global-state-manager';
import Callback from './typings/callback';
export default function removeCallback<G extends {} = State>(globalStateManager: GlobalStateManager<G>, callback: Callback<G>): boolean;
