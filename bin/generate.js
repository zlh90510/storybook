#!/usr/bin/env node

var updateNotifier = require('update-notifier');
var detect = require('../lib/detect');
var types = require('../lib/project_types');
var sh = require('shelljs');
var commandLog = require('../lib/helpers').commandLog;
var codeLog = require('../lib/helpers').codeLog;
var paddedLog = require('../lib/helpers').paddedLog;
var installNpmDeps = require('../lib/helpers').installNpmDeps;
var chalk = require('chalk');

console.log(chalk.inverse('\n getstorybook - the simplest way to add a storybook to your project. \n'));

// Update notify code.
var pkg = require('../package.json');
updateNotifier({
  pkg: pkg,
  updateCheckInterval: 1000 * 60 * 60, // every hour (we could increase this later on.)
}).notify();

var projectType;

var done = commandLog('Detecting project type');
try {
  projectType = detect();
} catch(ex) {
  done(ex.message);
  process.exit(1);
}
done();

switch (projectType) {
  case types.REACT_SCRIPTS:
    done = commandLog('Adding storybook support to your "Create React App" based project');
    require('../generators/REACT_SCRIPTS');
    done();

    installNpmDeps();

    console.log('\nTo run your storybook, type:\n')
    codeLog([
      'npm run storybook',
    ]);
    console.log('\nFor more information visit:',  chalk.cyan('https://getstorybook.io'))
    break;

  case types.REACT:
    done = commandLog('Adding storybook support to your "React" app');
    require('../generators/REACT');
    done();

    installNpmDeps();

    console.log('\nTo run your storybook, type:\n')
    codeLog([
      'npm run storybook',
    ]);
    console.log('\nFor more information visit:',  chalk.cyan('https://getstorybook.io'))
    break;

  case types.REACT_PROJECT:
    done = commandLog('Adding storybook support to your "React" library');
    require('../generators/REACT');
    done();

    installNpmDeps();

    console.log('\nTo run your storybook, type:\n')
    codeLog([
      'npm run storybook',
    ]);
    console.log('\nFor more information visit:',  chalk.cyan('https://getstorybook.io'))
    break;

  default:
    paddedLog('Unsupported Project type. (code: ' +  projectType + ')');
    paddedLog('Visit https://getstorybook.io for more information.');
}

// Add a new line for the clear visibility.
console.log();
