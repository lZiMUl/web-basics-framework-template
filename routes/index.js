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
import template from '../src/mongodbServer.js';

const exper = new template({
	nickname: "lZiMUl",
	username: "lZiMUl",
	password: "ABC123",
	email: "AA2908554069@gmail.com",
	date: new Date().getTime()
});

// Read View File
const getView = name => createReadStream(join('./public/html/', `${name}.html`));

const { stringify } = JSON;

function mongoDB(email, password) {
	return new Promise((callback, refuse) => {
		template.findOne({
			email,
			password
		}, (err, data) => {
			if (data)
			callback(data);
			else
			refuse(data);
		});
	})
};

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get('/', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('index');
}).post('/check', async socket => {
	const {
		email,
		password
	} = await socket.request.body;
	log({
		email,
		password
	});
	try {
		const result = await mongoDB(email, password);
		socket.response.redirect('/successView');
	} catch (err) {
		socket.status = 200;
		socket.type = 'text/html';
		socket.body = `<script>document.write('Please check if the account password exists or if the account password is entered, and after three seconds, redirect');setTimeout(() => location.href=\'/\', 3 * 1000);</script>`;
		};
});

// Export Router
export default Krs.routes();
