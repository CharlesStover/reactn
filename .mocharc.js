module.exports = {
  allowUncaught: false,
  checkLeaks: true,
  color: true,
  diff: true,
  extension: "ts",
  forbidOnly: true,
  forbidPending: false,
  fullTrace: false,
  inlineDiff: true,
  recursive: true,
  require: [
    'chai/register-expect',
    '@babel/register',
    'ts-node/register'
  ],
  sort: true,
  watchExtensions: "ts",
};
