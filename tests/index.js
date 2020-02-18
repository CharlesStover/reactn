/* eslint @typescript-eslint/no-var-requires: 0 */
const { execSync } = require('child_process');

const supportedVersions = [
  /*
  '~0.1',
  '~0.2',
  '~0.3',
  '~0.5',
  '~0.6',
  '~0.7',
  '~0.8',
  '~0.9',
  '~0.10',
  '~0.11',
  '~0.12',
  '~0.13',
  */
  // '~0.14', // ReactDOM
  // '~15.0',
  // '~15.3', // PureComponent
  // '~16.0',
  // '~16.3', // Context
  // '~16.8', // Hooks
  // '~16.9', // async act
  'latest',
];

const header = str => {
  console.log();
  console.log();
  console.log();
  const bar = '-'.repeat(str.length);
  console.log(`/-${bar}-\\`);
  console.log(`| ${str} |`);
  console.log(`\\-${bar}-/`);
};

for (const supportedVersion of supportedVersions) {
  header(`Installing react@${supportedVersion}.`);
  execSync(
    `yarn add react@${supportedVersion} react-dom@${supportedVersion} ` +
      '--dev --no-lockfile',
    {
      stdio: 'inherit',
    },
  );

  const { version } = require('react/package.json');
  delete require.cache[require.resolve('react/package.json')];
  header(`Testing react@${version}.`);
  let jestOptions = '';
  if (supportedVersion === 'latest') {
    jestOptions = ' --coverage';
  }
  execSync(`jest${jestOptions}`, {
    stdio: 'inherit',
  });
}
