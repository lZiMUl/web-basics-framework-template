'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import HtmlJsonHighlight from 'html-json-highlight';
import Kr from 'koa-router';
import { parse as Uparse } from 'url';
import { parse as Qparse } from 'qs';

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get(/api|api.json/, async socket => {
	const result = new HtmlJsonHighlight(JSON.parse(Qparse(Uparse(socket.request.url).query || 'content={"code":200,"status":true,"msg":"ok","data":"aaaa","a":{"a":{"a":[{"a":true},{"cao":"abcd"}]}},"b":["a",{"a":false},123]}').content));
	socket.status = 200;
	if (socket.request.url.indexOf('.json') === -1) {
		socket.type = 'text/html';
		socket.response.body = await result.body(false);
	} else {
		socket.type = 'application/json';
		socket.response.body = await result.body(true);
	}
});

// Export Router
export default Krs.routes();
