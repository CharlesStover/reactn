const { execSync } = require('child_process');

const supportedVersions = [
  // Context API is not supported
  // '0.1.2',
  // '0.2.6',
  // '0.3.5',
  // '0.5.2',
  // '0.6.3',
  // '0.7.0',
  // '0.8.0',
  // '0.9.0',
  // '0.10.0',
  // '0.11.2',
  // '0.12.2',
  // '0.13.3',
  // '0.14.8',
  // '15.0.0',
  // '15.6.2',
  // '16.0.0',
  // '16.3.0',
  '16.8.0',
  'latest',
];

for (const version of supportedVersions) {
  console.log(`Installing react@${version}...`)
  execSync(`yarn add react@${version} --dev --no-lockfile`, {
    stdio: 'inherit',
  });
  console.log(`Testing react@${version}...`);
  execSync('jest', {
    stdio: 'inherit',
  });
}
