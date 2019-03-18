import { expect } from 'chai';
import Transaction from './transaction';

interface MockState {
  mockProperty: boolean;
}

const propertyListener = (): void => { };

describe('Transaction', () => {

  it('should track properties', () => {
    const t = new Transaction();
    expect(t.properties).to.be.instanceOf(Map);
  });
  
  it('should track propertyListeners', () => {
    const t = new Transaction();
    expect(t.propertyListeners).to.be.instanceOf(Set);
  });
  
  it('should track void properties', () => {
    const t = new Transaction();
    expect(t.voidProperties).to.be.instanceOf(Set);
  });
  
  it('should add property listeners', () => {
    const t = new Transaction();
    expect(t.propertyListeners.size).to.equal(0);
    t.addPropertyListener(() => {});
    expect(t.propertyListeners.size).to.equal(1);
  });
  
  it('should delete properties', () => {
    const t = new Transaction<MockState>();
    expect(t.voidProperties.size).to.equal(0);
    t.deleteProperty('mockProperty');
    expect(t.voidProperties.size).to.equal(1);
  });
  
  it('should delete property listeners', () => {
    const t = new Transaction<MockState>();
    t.addPropertyListener(propertyListener);
    expect(t.propertyListeners.size).to.equal(1);
    t.deletePropertyListener(propertyListener);
    expect(t.propertyListeners.size).to.equal(0);
  });

  it('should set properties', () => {

    // Get property.
    const t = new Transaction<MockState>();
    expect(t.properties.size).to.equal(0);
    expect(t.properties.has('mockProperty')).to.equal(false);

    // Set property.
    t.setProperty('mockProperty', true);
    expect(t.properties.size).to.equal(1);
    expect(t.properties.has('mockProperty')).to.equal(true);
    expect(t.properties.get('mockProperty')).to.equal(true);
  });
});
