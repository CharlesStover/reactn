import { PropertyListener } from '../global-state-manager';

export default class Transaction<GS extends {} = {}> {

  private _properties: Map<keyof GS, any> = new Map();
  private _propertyListeners: Set<PropertyListener> = new Set();
  private _voidProperties: Set<keyof GS> = new Set();

  public addPropertyListener(propertyListener: PropertyListener): boolean {
    if (this._propertyListeners.has(propertyListener)) {
      return false;
    }
    this._propertyListeners.add(propertyListener);
    return true;
  }

  public deleteProperty(property: keyof GS): boolean {
    if (this._voidProperties.has(property)) {
      return false;
    }
    this._voidProperties.add(property);
    return true;
  }

  public deletePropertyListener(propertyListener: PropertyListener): boolean {
    return this._propertyListeners.delete(propertyListener);
  }

  public get properties(): Map<keyof GS, any> {
    return this._properties;
  }

  public get propertyListeners(): Set<PropertyListener> {
    return this._propertyListeners;
  }

  public setProperty<Property extends keyof GS>(
    property: Property,
    value: GS[Property],
  ): boolean {
    this._properties.set(property, value);
    return true;
  }

  public get voidProperties(): Set<keyof GS> {
    return this._voidProperties;
  }
}
