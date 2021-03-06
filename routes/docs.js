'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import Kr from 'koa-router';
import getView from '../tools/getView.js';

// Initialize Koa-Router Instance
const Krs = new Kr();

// Create Couter Path
Krs.get('/docs', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('home', './docs/');
});

// Export Router
export default Krs.routes();
