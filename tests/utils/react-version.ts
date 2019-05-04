import { version } from 'react/package.json';

type SemVer = [ number, number, number ];

const semVer: SemVer = version.split('.').map(
  (i: string): number => parseInt(i, 10),
) as SemVer;

const [ major, minor ] = semVer;

export const hasContext = (
  major > 16 ||
  major === 16 &&
  minor >= 3
);

export const hasHooks = (
  major > 16 ||
  major === 16 &&
  minor >= 8
);
