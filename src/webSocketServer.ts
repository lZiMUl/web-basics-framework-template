/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { info } from 'console';
import https from 'https';
import { WebSocketServer } from 'ws';
import chalk from 'chalk';
import {
	getConfig,
	getSecurityLicense,
	Config
} from './api.js';
import { IncomingMessage, ServerResponse } from 'http';

// Host And Port
type HostPort = Array<Config | null>;

// Get Host And Port
const [host, port]: HostPort = [getConfig('webSocket', 'host'), getConfig('webSocket', 'port')];

// Create HttpsServer
const server: https.Server<typeof IncomingMessage, typeof ServerResponse> = https.createServer(getSecurityLicense);

// Set Up A WebSocket Server
new WebSocketServer({
	server
}).addListener('connection', socket => {
	socket.addListener('message', event => info(new String(event)));
	socket.send('Hello, I am a websocket server');
});

// Bind Host And Port For HttpsServer
server.listen({
	host,
	port
}, (): void => info(chalk.red(`
----------lZiMUl Build Template----------
${chalk.blue(`The WebSocket Server Is Built On The Host As ${host} And The Port As ${port}`)}

${chalk.yellow('Copy This Address, Then Visit The Websocket Test Website On Your Browser To Test It')}

${chalk.green(`wss://${host}:${port}/`)}
----------lZiMUl Build Template----------
`)));