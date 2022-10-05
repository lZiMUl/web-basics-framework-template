/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
 */

// Import Basic Dependencies
import { info } from 'console';
import https from 'https';
import webServer from './koaServer.js';
import {
  Command,
  Option
} from 'commander';
import chalk from 'chalk';
import {
  getConfig,
  getSecurityLicense
} from './api.js';
import './webSocketServer.js';

// Host And Port
type HostPort = Array<string> | Array<number>;

// Create A New Command
const program: Command = new Command();

// Set The Version
program.version('1.0.0');

// Set The Option Content
program.addOption(new Option('-h, --host <string>', 'Custom Web Host'));
program.addOption(new Option('-p, --port <number>', 'Custom Web Port'));

// Parse Parameters
program.parse(process.argv);

// Get Host And Port
const [host, port]: HostPort = [
  program.opts().host ?? getConfig('webServer', 'host'),
  program.opts().port ?? getConfig('webServer', 'port'),
];

// Create HttpsServer And Then Bind The Host And Port
https.createServer(getSecurityLicense, webServer).listen({
  host,
  port,
}, (): void => info(chalk.red(`
----------lZiMUl Build Template----------
${chalk.blue(`The Web Server Is Built On The Host As ${host} And The Port As ${port}`)}

${chalk.yellow('Copy This Address, Then Open It In The Browser')}

${chalk.green(`https://${host}:${port}/`)}
----------lZiMUl Build Template----------
`)));
