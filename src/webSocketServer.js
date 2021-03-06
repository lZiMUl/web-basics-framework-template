'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { log } from 'console';
import https from 'https';
import { WebSocketServer } from 'ws';
import chalk from 'chalk';
import {
	getConfig,
	getSecurityLicense
} from './api.js';

// Get Host And Port
const [host, port] = [getConfig('webSocket', 'host'), getConfig('webSocket', 'port')];

// Create HttpsServer
const server = https.createServer(getSecurityLicense);

// Set Up A WebSocket Server
new WebSocketServer({
	server
}).addListener('connection', socket => {
	socket.addListener('message', event => log(new String(event)));
	socket.send('Hello, I am a websocket server');
});

// Bind Host And Port For HttpsServer
server.listen({
	host,
	port
}, event => log(chalk.red(`
----------lZiMUl Build Template----------
${chalk.blue(`The WebSocket Server Is Built On The Host As ${host} And The Port As ${port}`)}

${chalk.yellow('Copy This Address, Then Visit The Websocket Test Website On Your Browser To Test It')}

${chalk.green(`wss://${host}:${port}/`)}
----------lZiMUl Build Template----------
`)));