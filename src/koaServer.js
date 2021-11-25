'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import Koa from 'koa';
import Ks from 'koa-static';
import Kb from 'koa-bodyparser';

// Import Router
import indexView from '../routes/index.js';
import successView from '../routes/successView.js';
import api from '../routes/api.js';
import docs from '../routes/docs.js';
import tdscene from '../routes/tdscene.js';

// Initialize Koa Instance
const webServer = new Koa;

// Set Up Static Of The Router
webServer.use(new Ks('./'));
webServer.use(new Kb);

// Set Up The Router
webServer.use(indexView);
webServer.use(successView);
webServer.use(api);
webServer.use(docs);
webServer.use(tdscene);

// Set Up The 404 Page
webServer.use(async socket => {
	socket.status = 404;
	socket.type = 'text/html';
	socket.body = 'Sorry! The Page Is Missing';
});

// Export The KoaServer
export default webServer.callback();