export default class Transaction<GS> {

  _delete: Set<keyof GS> = new Set();
  _propertyListeners: Set<PropertyListener> = new Set();
  _state: Map<keyof GS, any> = new Map();

  get delete() {
    return this._delete;
  }

  get propertyListeners() {
    return this._propertyListeners;
  }

  get state() {
    return this._state;
  }
}
