export default function setGlobal(globalState, newGlobal, callback = null) {
  return globalState.setAnyCallback(newGlobal, callback);
};
