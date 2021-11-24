"use strict";

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
 */

// Import Basic Dependencies
import { log } from "console";
import https from "https";
import webServer from "./koaServer.js";
import { getConfig, getSecurityLicense } from "./api.js";
import "./webSocketServer.js";
import "./mongodbServer.js";

// Get Host And Port
const [host, port] = [
	getConfig("webServer", "host"),
	getConfig("webServer", "port"),
];

// Create HttpsServer And Then Bind The Host And Port
https.createServer(getSecurityLicense, webServer).listen({
	host,
	port,
}, event => log(`
----------lZiMUl Build Template----------
The Web Server Is Built On The Host As ${host} And The Port As ${port}

Copy This Address, Then Open It In The Browser

https://${host}:${port}/
----------lZiMUl Build Template----------
`));
