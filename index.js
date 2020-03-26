#!/usr/bin/env node
const { which } = require('shelljs');
const rc = require('rc-yaml');
const { commandJoin } = require('command-join');
const { execSync } = require('child_process');

if (!which('aws-vault')) {
  console.error(
    'Could not find aws-vault: https://github.com/99designs/aws-vault',
  );
  process.exit(1);
}

const config = rc('awsprofile', {}, {});

if (!config.profile) {
  console.error('No profile defined - place a .awsprofile file somewhere');
  process.exit(2);
}

console.log(`Using profile: ${config.profile}`);

const [, , ...args] = process.argv;

if (args[0] === '--') {
  args.shift();
} else {
  args.unshift('aws');
}

const cmd = commandJoin(args);

execSync(`aws-vault exec ${config.profile} -- ${cmd}`, { stdio: 'inherit' });
