'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Config And Ini Parser And ApiVerify
import reLoad from '../../build/tool/index.js';
import { parse } from '../../plugin/iniparse/index.js';
import windowApiVerify from './apiVerify.js';

// Little Func
const reSet = url => url.replace(/"/img, '');

// refresh The View Automatically When The Project Restarts
const reFresh = ((callback, delay) => {
	let core = null;
	return function(parameter) {
		core? clearTimeout(core): null;
		core = setTimeout(Event => {
			callback.apply(this, parameter);
		}, delay * 1000);
	};
}) (event => location.reload(), 3);

// MainActivity
window.addEventListener('load', async Global => {
	const { 
		host,
		port 
	} = parse(await reLoad()).exteriorWebSocket;

	new windowApiVerify('WebSocket', event => {
		
		const server = new WebSocket(reSet(`wss://${host}:${port}`));
		server.addEventListener('open', event => server.send('Hello, I am a realTimePreview plugin'));
		server.addEventListener('message', ({ data }) => console.log(data));
		server.addEventListener('error', reFresh);
		server.addEventListener('close', reFresh);
	}, console.warn);
});

export default reSet;
