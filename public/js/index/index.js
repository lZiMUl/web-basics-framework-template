'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Dependencies
import { navigatorApiVerify } from '../apiVerify.js';
import reLoad from '../../../build/tool/index.js';
import getViewAlert from '../../../build/tool/getViewAlert.js';
import { parse } from '../../../plugin/iniparse/index.js';
import reSet from '../realTimePreview.js';
import Alert from '../customAlert.js';
import '../console.js';

const {
	warn,
	error
} = console;

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
})('alertFrame');

// MainActivity
window.addEventListener('load', global => {
	new navigatorApiVerify('geolocation', ({ event }) => {
		event.getCurrentPosition(async event => {
			const {
				host,
				port
			} = parse(await reLoad()).exteriorWebSocket;
			const server = new WebSocket(reSet(`wss://${host}:${port}`));

			server.addEventListener('open', ({ target }) => {
				target.send(JSON.stringify({
					"lat": event.coords.latitude,
					"lon": event.coords.longitude
				}));
				target.send('Hello, I am a website client for index')
			});
			server.addEventListener('message', ({ data }) => {
				localStorage.setItem('cookie', data);
			})
		}, event => {
			switch (event.code) {
				case event.PERMISSION_DENIED:
					error('The user rejects the request to obtain the geographic location');
				break;

				case event.POSITION_UNAVAILABLE:
					error('Location information is not available');
				break;

				case event.TIMEOUT:
					error('Request user geographic location timed out');
				break;

				case event.UNKNOWN_ERROR:
					error('Unknown mistake');
				break;
				};
			}, {
			"enableHighAccuracy": true,
			"timeout": 5000,
			"maximumAge": 0,
			"provider": "system",
			"coordsType": "system",
			"geocode": true
		});
	}, warn);
});