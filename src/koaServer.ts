/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';

// Import Router
import index from './router/index.js';
import doc from './router/doc.js';

// Initialize Koa Instance
const koaServer = new Koa();

// Set Up Static Of The Router
koaServer.use(koaStatic('.'));
koaServer.use(koaBodyparser());

// Set Up The Router
koaServer.use(index);
koaServer.use(doc);

// Set Up The 404 Page
koaServer.use(async (socket: Koa.ParameterizedContext<Koa.DefaultContext>) => {
	socket.status = 404;
	socket.type = 'text/html';
	socket.body = 'Sorry! The Page Is Missing';
});

// Export The KoaServer
export default koaServer.callback();