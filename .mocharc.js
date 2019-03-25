const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  allowUncaught: false,
  checkLeaks: true,
  color: true,
  diff: true,
  extension: [ 'ts', 'tsx' ],
  forbidOnly: !isDev,
  forbidPending: !isDev,
  fullTrace: false,
  inlineDiff: true,
  recursive: true,
  require: [
    'chai/register-expect',
    '@babel/register',
    'ts-node/register',
  ],
  sort: true,
  watch: isDev,
  watchExtensions: [ 'ts', 'tsx' ],
};
