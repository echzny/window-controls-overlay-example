const path = require('path');

const rootPath = path.join(__dirname, '../..');

const erbPath = path.join(__dirname, '..');
const erbNodeModulesPath = path.join(erbPath, 'node_modules');

const dllPath = path.join(__dirname, '../dll');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');

const releasePath = path.join(rootPath, 'release');
const appPath = path.join(releasePath, 'app');
const appPackagePath = path.join(appPath, 'package.json');
const appNodeModulesPath = path.join(appPath, 'node_modules');
const srcNodeModulesPath = path.join(srcPath, 'node_modules');

const distPath = path.join(appPath, 'dist');
const distMainPath = path.join(distPath, 'main');

const buildPath = path.join(releasePath, 'build');

export default {
  rootPath,
  erbNodeModulesPath,
  dllPath,
  srcPath,
  srcMainPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  buildPath,
};
