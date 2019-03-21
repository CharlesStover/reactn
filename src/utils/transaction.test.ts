import { expect } from 'chai';
import Transaction from './transaction';

interface MockState {
  mockProperty: string;
}

const MOCK_PROPERTY = 'mockProperty';
const MOCK_VALUE = 'MOCK VALUE';
const MOCK_VALUE2 = 'MOCK VALUE 2';

describe('Transaction', () => {

  let t: Transaction<MockState>;

  beforeEach(() => {
    t = new Transaction<MockState>();
  });



  describe('Properties', () => {

    it('should be tracked', () => {
      expect(t.properties).to.be.instanceOf(Map);
      expect(t.voidProperties).to.be.instanceOf(Set);
    });

    it('should instantiate to empty', () => {
      expect(t.properties.size).to.equal(0);
      expect(t.voidProperties.size).to.equal(0);
    });

    it('should add if new', () => {

      // Get property.
      expect(t.properties.size).to.equal(0);
      expect(t.properties.has(MOCK_PROPERTY)).to.equal(false);
  
      // Set property.
      const success = t.setProperty(MOCK_PROPERTY, MOCK_VALUE);
      expect(success).to.equal(true);
      expect(t.properties.size).to.equal(1);
      expect(t.properties.has(MOCK_PROPERTY)).to.equal(true);
      expect(t.properties.get(MOCK_PROPERTY)).to.equal(MOCK_VALUE);
    });

    it('should update if old', () => {

      // Get property.
      expect(t.properties.size).to.equal(0);
      expect(t.properties.has(MOCK_PROPERTY)).to.equal(false);
  
      // Set property.
      t.setProperty(MOCK_PROPERTY, MOCK_VALUE);
      const success = t.setProperty(MOCK_PROPERTY, MOCK_VALUE2);
      expect(success).to.equal(true);
      expect(t.properties.size).to.equal(1);
      expect(t.properties.has(MOCK_PROPERTY)).to.equal(true);
      expect(t.properties.get(MOCK_PROPERTY)).to.equal(MOCK_VALUE2);

    });
  
    it('should be able to be deleted if new', () => {
      const success = t.deleteProperty(MOCK_PROPERTY);
      expect(success).to.equal(true);
      expect(t.voidProperties.size).to.equal(1);
    });
  
    it('should not be able to be deleted if old', () => {
      t.deleteProperty(MOCK_PROPERTY);
      const success = t.deleteProperty(MOCK_PROPERTY);
      expect(success).to.equal(false);
      expect(t.voidProperties.size).to.equal(1);
    });
  
  });



  describe('Property Listeners', () => {

    const propertyListener = (): void => { };

    it('should be tracked', () => {
      expect(t.propertyListeners).to.be.instanceOf(Set);
    });

    it('should instantiate to empty', () => {
      expect(t.propertyListeners.size).to.equal(0);
    });
  
    it('should add if new', () => {
      const success = t.addPropertyListener(propertyListener);
      expect(success).to.equal(true);
      expect(t.propertyListeners.size).to.equal(1);
    });
  
    it('should not add if old', () => {
      t.addPropertyListener(propertyListener);
      const success = t.addPropertyListener(propertyListener);
      expect(success).to.equal(false);
      expect(t.propertyListeners.size).to.equal(1);
    });

    it('should be able to be deleted', () => {
      t.addPropertyListener(propertyListener);
      expect(t.propertyListeners.size).to.equal(1);
      t.deletePropertyListener(propertyListener);
      expect(t.propertyListeners.size).to.equal(0);
    });

  });
});
