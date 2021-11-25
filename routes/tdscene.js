'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { log } from 'console';
import { createReadStream } from 'fs';
import { join } from 'path';
import Kr from 'koa-router';

// Read View File
const getView = name => createReadStream(join('./public/html/', `${name}.html`));

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get('/tdscene', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('tdscene');
});

// Export Router
export default Krs.routes();
