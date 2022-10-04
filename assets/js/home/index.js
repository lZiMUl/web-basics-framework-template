'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import ApiVerify And ReLoad And Parse And Reset

import { navigatorApiVerify } from '../../../public/js/apiVerify.js';
import reLoad from '../../../build/tool/index.js';
import getViewAlert from '../../../build/tool/getViewAlert.js';
import { parse } from '../../../plugin/iniparse/index.js';
import reSet from '../../../public/js/realTimePreview.js';
import Alert from '../../../public/js/customAlert.js';
import '../../../node_modules/eruda/eruda.js';
import ImportErudaPlugins from '../../../plugin/its/importErudaPlugins.js';

new ImportErudaPlugins('fps');
new ImportErudaPlugins('features');
new ImportErudaPlugins('timing');
new ImportErudaPlugins('memory');
new ImportErudaPlugins('code');
new ImportErudaPlugins('benchmark');
new ImportErudaPlugins('geolocation');
new ImportErudaPlugins('dom');
new ImportErudaPlugins('orientation');
new ImportErudaPlugins('touches');

eruda.init();
hljs.highlightAll();

// Drag Method
function Drag(event) {
	event.stopPropagation();
	const {
		clientX,
		clientY
	} = event.touches[0];
	event.Alert.style.left = clientX.toString().concat('px');
	event.Alert.style.top = clientY.toString().concat('px');
	event.Alert.style.right = 'auto';
	event.Alert.style.bottom = 'auto';
};

(async view => {
	new Alert({
		title: 'Web Basics Framework Template',
		content: await getViewAlert(view),
		close: 'Close'
	})
	// Default no use
	// .addEventListener('touchmove', Drag);
	
	const {
		host,
		port
	} = parse(await reLoad()).exteriorWebSocket;
	const server = new WebSocket(reSet(`wss://${host}:${port}`));
	
	server.addEventListener('open', ({ target }) => {
		target.send('Hello, I am a website client for docs')
	});
})('alertFrame');
