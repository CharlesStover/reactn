import globalStateManager from './global-state-manager';

const getDerivedGlobalFromProps = function(props) {
  if (Object.prototype.hasOwnProperty.call(this.constructor, 'getDerivedGlobalFromProps')) {
    const newState = this.constructor.getDerivedGlobalFromProps(props, this.global);
    globalStateManager.set(newState);
  }
};

export default getDerivedGlobalFromProps;
