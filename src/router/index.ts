/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { ParameterizedContext } from 'koa';
import Kr from 'koa-router';
import getView from '../tool/getView.js';

// Initialize Koa-Router Instance
const Krs = new Kr();

// Create Router Path
Krs.get('/', async (socket: ParameterizedContext) => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('index');
});

// Export Router
export default Krs.routes();
